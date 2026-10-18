import { HttpErrors } from '@loopback/rest'

export const normalizeEmail = (email: string): string =>
  email.trim().toLowerCase()

export const isExpired = (date: Date | string): boolean =>
  new Date(date).getTime() <= Date.now()

export function extractBearerToken(authHeader?: string): string {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new HttpErrors.Unauthorized('Missing Bearer token')
  }
  const token = authHeader.slice('Bearer '.length).trim()
  if (!token) {
    throw new HttpErrors.Unauthorized('Missing Bearer token')
  }
  return token
}
