import { HttpErrors } from '@loopback/rest'
import jwt from 'jsonwebtoken'

import { EConfigKeys } from '../../../config/config'
import { Member } from '../../member/models'
import { ACCESS_TOKEN_EXPIRES_IN } from '../types/constants'

export function signMemberAccessToken(
  member: Pick<Member, 'id' | 'email'>,
): string {
  return jwt.sign(
    { type: 'member', memberId: member.id, email: member.email },
    EConfigKeys.memberJwtSecret,
    { algorithm: 'HS256', expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  )
}

/** Returns the memberId from a valid member access token, or throws 401. */
export function verifyMemberAccessToken(token: string): number {
  const unauthorized = () =>
    new HttpErrors.Unauthorized('Invalid or expired access token.')

  let payload: jwt.JwtPayload | string
  try {
    payload = jwt.verify(token, EConfigKeys.memberJwtSecret, {
      algorithms: ['HS256'],
    })
  } catch {
    throw unauthorized()
  }

  // Only member tokens may use member routes.
  if (
    typeof payload === 'string' ||
    payload.type !== 'member' ||
    typeof payload.memberId !== 'number'
  ) {
    throw unauthorized()
  }
  return payload.memberId
}
