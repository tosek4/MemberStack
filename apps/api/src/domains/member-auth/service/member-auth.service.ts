import { BindingScope, inject, injectable } from '@loopback/core'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'

import { EmailService } from '../../../services/email/email.services'
import { EMAIL_SERVICE } from '../../../services/email/keys'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { MemberStatus } from '../../member/types/member-status'
import { CODE_TTL_MS, MAX_ATTEMPTS, REFRESH_TTL_MS, REQUEST_COOLDOWN_MS } from '../types/constants'
import { MemberAuthCodeRepository, MemberRefreshTokenRepository } from '../repositories'
import {
  MemberCheckInHistoryItem,
  MemberCheckInHistoryResponse,
  MemberData,
  MemberPaymentHistoryItem,
  MemberPaymentHistoryResponse,
  MemberSubscriptionData,
} from '../types'
import {
  generateLoginCode,
  generateRefreshToken,
  hashLoginCode,
  hashRefreshToken,
  isExpired,
  normalizeEmail,
  safeEqualHex,
  signMemberAccessToken,
  verifyMemberAccessToken,
} from '../utils'
import { MemberQRCodeService } from '../../member-qrcode/services/member-qrcode.service'
import { MEMBER_QR_CODE_SERVICE } from '../../member-qrcode/keys'
import { AttendanceRepository } from '../../attendance/repositories'
import { Attendance } from '../../attendance/models'
import { PaymentRepository } from '../../payment/repositories'
import { Payment } from '../../payment/models'
export interface TokenPair {
  accessToken: string
  refreshToken: string
}

const invalidCodeError = () => new HttpErrors.Unauthorized('Invalid or expired verification code.')

const invalidRefreshError = () => new HttpErrors.Unauthorized('Invalid or expired refresh token.')

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberAuthService {
  constructor(
    @repository(MemberRepository)
    private memberRepository: MemberRepository,

    @repository(MemberAuthCodeRepository)
    private codeRepository: MemberAuthCodeRepository,

    @repository(MemberRefreshTokenRepository)
    private refreshTokenRepository: MemberRefreshTokenRepository,

    @repository(AttendanceRepository)
    private attendanceRepository: AttendanceRepository,

    @repository(PaymentRepository)
    private paymentRepository: PaymentRepository,

    @inject(EMAIL_SERVICE)
    private emailService: EmailService,

    @inject(MEMBER_QR_CODE_SERVICE)
    private memberQRCodeService: MemberQRCodeService,
  ) {}

  async createRequestCode(email: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email)
    const now = new Date()

    const existing = await this.codeRepository.findOne({
      where: { email: normalizedEmail },
    })

    if (
      existing &&
      now.getTime() - new Date(existing.requestedAt).getTime() < REQUEST_COOLDOWN_MS
    ) {
      return
    }

    const member = await this.findActiveMemberByEmail(normalizedEmail)
    if (!member) return

    const code = generateLoginCode()
    const codeData = {
      email: normalizedEmail,
      memberId: member.id,
      codeHash: hashLoginCode(normalizedEmail, code),
      expiresAt: new Date(now.getTime() + CODE_TTL_MS),
      requestedAt: now,
      attempts: 0,
    }

    if (existing) {
      await this.codeRepository.updateById(existing.id!, codeData)
    } else {
      await this.codeRepository.create(codeData)
    }

    try {
      await this.emailService.sendMemberVerificationCode({
        to: normalizedEmail,
        code,
      })
    } catch (error) {
      console.error('Failed to send member verification email', error)
    }
  }

  async verifyCode(email: string, code: string): Promise<TokenPair> {
    const normalizedEmail = normalizeEmail(email)

    const record = await this.codeRepository.findOne({
      where: { email: normalizedEmail },
    })
    if (!record) throw invalidCodeError()

    if (
      !record.codeHash ||
      !record.expiresAt ||
      isExpired(record.expiresAt) ||
      record.attempts >= MAX_ATTEMPTS
    ) {
      await this.codeRepository.deleteById(record.id!)
      throw invalidCodeError()
    }

    const submittedHash = hashLoginCode(normalizedEmail, code)
    if (!safeEqualHex(submittedHash, record.codeHash)) {
      await this.codeRepository.updateById(record.id!, {
        attempts: record.attempts + 1,
      })
      throw invalidCodeError()
    }

    await this.codeRepository.deleteById(record.id!)

    const member = await this.findActiveMemberByEmail(normalizedEmail)
    if (!member) throw invalidCodeError()

    return this.issueTokens(member)
  }

  async refresh(token: string): Promise<TokenPair> {
    const record = await this.refreshTokenRepository.findOne({
      where: { tokenHash: hashRefreshToken(token) },
    })

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (!record || record.revokedAt || isExpired(record.expiresAt)) {
      throw invalidRefreshError()
    }

    const member = await this.findActiveMemberById(record.memberId)
    if (!member) throw invalidRefreshError()

    const revoked = await this.refreshTokenRepository.updateAll(
      { revokedAt: new Date() },
      { id: record.id, revokedAt: null as unknown as Date | undefined },
    )
    if (revoked.count !== 1) throw invalidRefreshError()

    return this.issueTokens(member)
  }

  async getMemberInfo(accessToken: string): Promise<MemberData> {
    const memberId = verifyMemberAccessToken(accessToken)

    const member = await this.memberRepository
      .findById(memberId, {
        include: [
          {
            relation: 'subscriptions',
            scope: {
              order: ['startedAt DESC', 'expiresAt DESC'],
              limit: 1,
              include: ['membershipPlan'],
            },
          },
        ],
      })
      .catch(() => null)

    if (!member || member.status !== MemberStatus.ACTIVE) {
      throw new HttpErrors.Unauthorized('Invalid or expired access token.')
    }

    const { subscriptions, ...memberData } = member
    const latest = subscriptions?.[0]
    const { membershipPlan, ...subscriptionData } = latest ?? {}

    return {
      id: member.id!,
      member: memberData as Member,
      subscription: latest ? { ...subscriptionData, plan: membershipPlan! } : undefined,
    }
  }

  async getMemberQrCode(accessToken: string): Promise<{ token: string }> {
    const memberId = verifyMemberAccessToken(accessToken)

    const member = await this.findActiveMemberById(memberId)
    if (!member) {
      throw new HttpErrors.Unauthorized('Invalid or expired access token.')
    }

    const token = await this.memberQRCodeService.getActiveToken(memberId)
    if (!token) {
      throw new HttpErrors.NotFound('No active QR code yet. Please ask reception for help.')
    }

    return { token }
  }

  async getMemberSubscriptionHistory(
    token: string,
  ): Promise<{ subscriptions: MemberSubscriptionData[] }> {
    const memberId = verifyMemberAccessToken(token)

    const member = await this.findActiveMemberById(memberId)
    if (!member) {
      throw new HttpErrors.Unauthorized('Invalid or expired access token.')
    }

    const memberData = await this.memberRepository
      .findById(memberId, {
        include: [
          {
            relation: 'subscriptions',
            scope: {
              where: { status: { neq: 'active' } },
              order: ['startedAt DESC', 'expiresAt DESC'],
              include: ['membershipPlan'],
            },
          },
        ],
      })
      .catch(() => null)

    return { subscriptions: memberData?.subscriptions ?? [] }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.updateAll(
      { revokedAt: new Date() },
      {
        tokenHash: hashRefreshToken(refreshToken),
        revokedAt: null as unknown as Date | undefined,
      },
    )
  }
  async getMemberCheckInHistory(
    token: string,
    limit = 10,
    offset = 0,
  ): Promise<MemberCheckInHistoryResponse> {
    const memberId = verifyMemberAccessToken(token)

    const member = await this.findActiveMemberById(memberId)

    if (!member) {
      throw new HttpErrors.Unauthorized('Invalid or expired access token.')
    }

    const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100)
    const safeOffset = Math.max(0, Math.floor(offset))

    const where = { memberId }

    const [attendances, count] = await Promise.all([
      this.attendanceRepository.find({
        where,
        order: ['checkedInAt DESC'],
        limit: safeLimit,
        skip: safeOffset,
      }),
      this.attendanceRepository.count(where),
    ])

    const checkIns: MemberCheckInHistoryItem[] = attendances.map((attendance: Attendance) => ({
      id: attendance.id!,
      checkIn: attendance.checkedInAt,
      checkOut: attendance.checkedOutAt ?? null,
      status: attendance.checkedOutAt ? 'checked-out' : 'checked-in',
    }))

    return {
      checkIns,
      pagination: {
        limit: safeLimit,
        offset: safeOffset,
        total: count.count,
        hasMore: safeOffset + checkIns.length < count.count,
      },
    }
  }

  async updateMemberProfile(
    accessToken: string,
    data: {
      firstName?: string
      lastName?: string
      phone?: string | null
    },
  ): Promise<MemberData> {
    const memberId = verifyMemberAccessToken(accessToken)

    const member = await this.findActiveMemberById(memberId)

    if (!member) {
      throw new HttpErrors.Unauthorized('Invalid or expired access token.')
    }

    const updateData: {
      firstName?: string
      lastName?: string
      phone?: string | null
    } = {}

    if (data.firstName !== undefined) {
      const firstName = data.firstName.trim()

      if (!firstName) {
        throw new HttpErrors.BadRequest('First name cannot be empty.')
      }

      updateData.firstName = firstName
    }

    if (data.lastName !== undefined) {
      const lastName = data.lastName.trim()

      if (!lastName) {
        throw new HttpErrors.BadRequest('Last name cannot be empty.')
      }

      updateData.lastName = lastName
    }

    if (data.phone !== undefined) {
      updateData.phone = data.phone?.trim() || null
    }

    if (Object.keys(updateData).length === 0) {
      throw new HttpErrors.BadRequest('No profile fields provided.')
    }

    await this.memberRepository.updateById(memberId, updateData as Partial<Member>)

    return this.getMemberInfo(accessToken)
  }

  async getMemberPaymentHistory(
    accessToken: string,
    limit = 10,
    offset = 0,
  ): Promise<MemberPaymentHistoryResponse> {
    const memberId = verifyMemberAccessToken(accessToken)

    await this.findActiveMemberById(memberId)

    const safeLimit = Math.min(Math.max(limit, 1), 100)
    const safeOffset = Math.max(offset, 0)

    const where = { memberId }

    const [payments, total] = await Promise.all([
      this.paymentRepository.find({
        where,
        order: ['paidAt DESC', 'id DESC'],
        limit: safeLimit,
        skip: safeOffset,
        include: [
          {
            relation: 'memberSubscription',
            scope: {
              include: ['membershipPlan'],
            },
          },
        ],
      }),
      this.paymentRepository.count(where),
    ])

    return {
      payments: payments.map((payment) => ({
        id: payment.id!,
        amount: payment.amount!,
        currency: 'EUR',
        paymentMethod: payment.paymentMethod,
        status: payment.status ?? 'pending',
        paidAt: payment.paidAt!,
        transactionReference: payment.transactionReference,
        membershipPlan: payment.memberSubscription?.membershipPlan
          ? {
              id: payment.memberSubscription.membershipPlan.id!,
              name: payment.memberSubscription.membershipPlan.name,
            }
          : null,
      })),
      pagination: {
        limit: safeLimit,
        offset: safeOffset,
        total: total.count,
        hasMore: safeOffset + payments.length < total.count,
      },
    }
  }

  // ---------------------------- Private Methods ----------------------------
  private async findActiveMemberByEmail(email: string): Promise<Member | null> {
    const member = await this.memberRepository.findOne({ where: { email } })
    return member?.status === MemberStatus.ACTIVE ? member : null
  }

  private async findActiveMemberById(id: number): Promise<Member | null> {
    const member = await this.memberRepository.findById(id).catch(() => null)
    return member?.status === MemberStatus.ACTIVE ? member : null
  }

  private async issueTokens(member: Member): Promise<TokenPair> {
    const refreshToken = generateRefreshToken()

    await this.refreshTokenRepository.create({
      memberId: member.id!,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
    })

    return { accessToken: signMemberAccessToken(member), refreshToken }
  }
}
