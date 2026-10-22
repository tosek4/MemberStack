import { TEST_SECRET } from './setup-env'

import { expect } from '@loopback/testlab'
import jwt from 'jsonwebtoken'
import { describe, it } from 'node:test'
import {
  signMemberAccessToken,
  verifyMemberAccessToken,
} from '../../domains/member-auth/utils'

const nowInSeconds = () => Math.floor(Date.now() / 1000)

describe('member access token', () => {
  it('round-trips the member id', () => {
    const token = signMemberAccessToken({ id: 7, email: 'a@example.com' })

    expect(verifyMemberAccessToken(token)).equal(7)
  })

  it('rejects a token of another type', () => {
    const token = jwt.sign({ type: 'user', memberId: 7 }, TEST_SECRET)

    expect(() => verifyMemberAccessToken(token)).throw(
      /Invalid or expired access token/,
    )
  })

  it('rejects a token signed with a different secret', () => {
    const token = jwt.sign({ type: 'member', memberId: 7 }, 'another-secret')

    expect(() => verifyMemberAccessToken(token)).throw(
      /Invalid or expired access token/,
    )
  })

  it('rejects an expired token', () => {
    const token = jwt.sign(
      { type: 'member', memberId: 7, exp: nowInSeconds() - 10 },
      TEST_SECRET,
    )

    expect(() => verifyMemberAccessToken(token)).throw(
      /Invalid or expired access token/,
    )
  })

  it('rejects garbage', () => {
    expect(() => verifyMemberAccessToken('not-a-jwt')).throw(
      /Invalid or expired access token/,
    )
  })
})
