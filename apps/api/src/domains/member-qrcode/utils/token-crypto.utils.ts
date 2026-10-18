import crypto from 'crypto'

import { EConfigKeys } from '../../../config/config'

const getKey = (): Buffer =>
  crypto
    .createHash('sha256')
    .update(`qr-token-encryption:${EConfigKeys.memberJwtSecret}`)
    .digest()

export function encryptToken(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv)
  const encrypted = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  return [iv, tag, encrypted].map((b) => b.toString('hex')).join('.')
}

export function decryptToken(payload: string): string {
  const [iv, tag, encrypted] = payload
    .split('.')
    .map((h) => Buffer.from(h, 'hex'))
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    'utf8',
  )
}
