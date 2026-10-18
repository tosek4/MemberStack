import crypto from 'crypto'

import { EConfigKeys } from '../../../config/config'

function hmac(value: string): string {
  return crypto
    .createHmac('sha256', EConfigKeys.memberJwtSecret)
    .update(value)
    .digest('hex')
}

export const hashRefreshToken = (token: string): string => hmac(token)

export const hashLoginCode = (email: string, code: string): string =>
  hmac(`${email}:${code}`)

export const generateLoginCode = (): string =>
  crypto.randomInt(100000, 1000000).toString()

export const generateRefreshToken = (): string =>
  crypto.randomBytes(48).toString('hex')

/** Constant-time comparison of two hex strings. */
export function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  const bufA = Buffer.from(a, 'hex')
  const bufB = Buffer.from(b, 'hex')
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB)
}
