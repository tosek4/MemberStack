import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import crypto from 'crypto'
import QRCode from 'qrcode'

import { MemberQRCodeRepository } from '../repositories/member-qrcode.repository'
import { MemberQRCode } from '../models/member-qrcode.model'
import { EmailService } from '../../../services/email/email.services'
import { MemberRepository } from '../../member/repositories'
import { inject } from '@loopback/core'

export class MemberQRCodeService {
  constructor(
    @repository(MemberQRCodeRepository)
    private memberQRCodeRepository: MemberQRCodeRepository,

    @repository(MemberRepository)
    private memberRepository: MemberRepository,

    @inject('service.email')
    private emailService: EmailService,
  ) {}

  generateToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex')
  }

  async createQRCode(
    memberId: number,
    createdByUserId?: number,
  ): Promise<{
    qrCode: MemberQRCode
    image: string
  }> {
    const member = await this.memberRepository.findById(memberId)

    if (!member.email) {
      throw new HttpErrors.BadRequest('Member does not have an email address')
    }

    const token = this.generateToken()
    const tokenHash = this.hashToken(token)

    const qrCode = await this.memberQRCodeRepository.create({
      memberId,
      tokenHash,
      status: 'active',
      issuedAt: new Date().toISOString(),
      createdByUserId,
    })

    const image = await this.generateQRCodeImage(token)

    try {
      await this.emailService.sendQRCodeEmail({
        to: member.email,
        memberName: `${member.firstName} ${member.lastName}`,
        image,
      })
    } catch (error) {
      await this.revokeQRCode(qrCode.id!)
      throw error
    }

   
    await this.memberQRCodeRepository.updateAll(
      { status: 'revoked', revokedAt: new Date().toISOString() },
      { memberId, status: 'active', id: { neq: qrCode.id } },
    )

    return {
      qrCode: {
        id: qrCode.id!,
        memberId: qrCode.memberId,
        status: qrCode.status,
        issuedAt: qrCode.issuedAt,
        revokedAt: qrCode.revokedAt,
      } as MemberQRCode,
      image,
    }
  }

  async revokeQRCode(id: number): Promise<void> {
    const qrCode = await this.memberQRCodeRepository.findById(id)

    if (qrCode.status === 'revoked') {
      return
    }

    await this.memberQRCodeRepository.updateById(id, {
      status: 'revoked',
      revokedAt: new Date().toISOString(),
    })
  }

  async findActiveQRCode(memberId: number): Promise<MemberQRCode | null> {
    return this.memberQRCodeRepository.findOne({
      where: {
        memberId,
        status: 'active',
      },
    })
  }

  async verifyToken(token: string): Promise<MemberQRCode | null> {
    const tokenHash = this.hashToken(token)

    return this.memberQRCodeRepository.findOne({
      where: {
        tokenHash,
        status: 'active',
      },
    })
  }

  async generateQRCodeImage(token: string): Promise<string> {
    const image = await QRCode.toDataURL(token, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 2,
      width: 400,
    })

    return image
  }
}
