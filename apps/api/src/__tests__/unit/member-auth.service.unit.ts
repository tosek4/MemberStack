import './setup-env'

import { createStubInstance, expect, sinon } from '@loopback/testlab'
import { describe, it } from 'node:test'
import { MemberStatus } from '../../domains/member/types/member-status'
import { MemberRepository } from '../../domains/member/repositories'
import { MemberAuthCodeRepository, MemberRefreshTokenRepository } from '../../domains/member-auth/repositories'
import { MemberAuthService } from '../../domains/member-auth/service'
import { hashLoginCode, hashRefreshToken } from '../../domains/member-auth/utils'


const EMAIL = 'member@example.com'
const CODE = '123456'

const activeMember = { id: 1, email: EMAIL, status: MemberStatus.ACTIVE }

const codeRecord = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  email: EMAIL,
  memberId: 1,
  codeHash: hashLoginCode(EMAIL, CODE),
  expiresAt: new Date(Date.now() + 60_000),
  requestedAt: new Date(),
  attempts: 0,
  ...overrides,
})

const refreshRecord = (overrides: Record<string, unknown> = {}) => ({
  id: 5,
  memberId: 1,
  tokenHash: hashRefreshToken('old-refresh-token'),
  expiresAt: new Date(Date.now() + 60_000),
  revokedAt: undefined,
  ...overrides,
})

function setup() {
  const memberRepository = createStubInstance(MemberRepository)
  const codeRepository = createStubInstance(MemberAuthCodeRepository)
  const refreshTokenRepository = createStubInstance(
    MemberRefreshTokenRepository,
  )
  const emailService = { sendMemberVerificationCode: sinon.stub().resolves() }

  const service = new MemberAuthService(
    memberRepository,
    codeRepository,
    refreshTokenRepository,
    emailService as never,
    {} as never, // MemberQRCodeService: not used by these tests
  )

  return { service, memberRepository, codeRepository, refreshTokenRepository }
}

describe('MemberAuthService.verifyCode', () => {
  it('issues tokens for the right code and burns the code', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(codeRecord() as never)
    t.memberRepository.stubs.findOne.resolves(activeMember as never)
    t.refreshTokenRepository.stubs.create.resolves({} as never)

    const result = await t.service.verifyCode(EMAIL, CODE)

    expect(result.accessToken).be.a.String()
    expect(result.refreshToken).be.a.String()
    sinon.assert.calledWith(t.codeRepository.stubs.deleteById, 1)
    sinon.assert.calledOnce(t.refreshTokenRepository.stubs.create)
  })

  it('rejects a wrong code and counts the attempt', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(codeRecord() as never)

    await expect(t.service.verifyCode(EMAIL, '000000')).to.be.rejectedWith(
      /Invalid or expired verification code/,
    )

    sinon.assert.calledWith(t.codeRepository.stubs.updateById, 1, {
      attempts: 1,
    })
    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })

  it('locks the code after 5 wrong attempts, even for the right code', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(
      codeRecord({ attempts: 5 }) as never,
    )

    await expect(t.service.verifyCode(EMAIL, CODE)).to.be.rejectedWith(
      /Invalid or expired verification code/,
    )

    sinon.assert.calledWith(t.codeRepository.stubs.deleteById, 1)
    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })

  it('rejects an expired code', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(
      codeRecord({ expiresAt: new Date(Date.now() - 1000) }) as never,
    )

    await expect(t.service.verifyCode(EMAIL, CODE)).to.be.rejectedWith(
      /Invalid or expired verification code/,
    )

    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })

  it('rejects when there is no code, as after it was already used', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(null)

    await expect(t.service.verifyCode(EMAIL, CODE)).to.be.rejectedWith(
      /Invalid or expired verification code/,
    )
  })

  it('rejects a member who is not active', async () => {
    const t = setup()
    t.codeRepository.stubs.findOne.resolves(codeRecord() as never)
    t.memberRepository.stubs.findOne.resolves({
      ...activeMember,
      status: 'inactive',
    } as never)

    await expect(t.service.verifyCode(EMAIL, CODE)).to.be.rejectedWith(
      /Invalid or expired verification code/,
    )

    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })
})

describe('MemberAuthService.refresh', () => {
  it('rotates a valid refresh token', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.findOne.resolves(refreshRecord() as never)
    t.memberRepository.stubs.findById.resolves(activeMember as never)
    t.refreshTokenRepository.stubs.updateAll.resolves({ count: 1 })
    t.refreshTokenRepository.stubs.create.resolves({} as never)

    const result = await t.service.refresh('old-refresh-token')

    expect(result.accessToken).be.a.String()
    expect(result.refreshToken).be.a.String()
    sinon.assert.calledOnce(t.refreshTokenRepository.stubs.updateAll)
    sinon.assert.calledOnce(t.refreshTokenRepository.stubs.create)
  })

  it('rejects a token that was already revoked', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.findOne.resolves(
      refreshRecord({ revokedAt: new Date() }) as never,
    )

    await expect(t.service.refresh('old-refresh-token')).to.be.rejectedWith(
      /Invalid or expired refresh token/,
    )

    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })

  it('rejects when another request rotated the token first', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.findOne.resolves(refreshRecord() as never)
    t.memberRepository.stubs.findById.resolves(activeMember as never)
    t.refreshTokenRepository.stubs.updateAll.resolves({ count: 0 })

    await expect(t.service.refresh('old-refresh-token')).to.be.rejectedWith(
      /Invalid or expired refresh token/,
    )

    sinon.assert.notCalled(t.refreshTokenRepository.stubs.create)
  })

  it('rejects an unknown token', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.findOne.resolves(null)

    await expect(t.service.refresh('nope')).to.be.rejectedWith(
      /Invalid or expired refresh token/,
    )
  })
})

describe('MemberAuthService.logout', () => {
  it('revokes the refresh token it is given', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.updateAll.resolves({ count: 1 })

    await t.service.logout('some-token')

    sinon.assert.calledWithMatch(
      t.refreshTokenRepository.stubs.updateAll,
      sinon.match.object,
      { tokenHash: hashRefreshToken('some-token') },
    )
  })

  it('does not fail for an unknown token', async () => {
    const t = setup()
    t.refreshTokenRepository.stubs.updateAll.resolves({ count: 0 })

    await expect(t.service.logout('unknown')).to.be.fulfilled()
  })
})