export const getAccessTokenExpiry = (expiresIn: string): number => {
  const match = expiresIn.match(/^(\d+)([smhd])$/)

  if (!match) {
    throw new Error(`Invalid token expiration format: ${expiresIn}`)
  }

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  }

  const value = Number(match[1])
  const unit = match[2] as keyof typeof multipliers

  return Date.now() + value * multipliers[unit]
}
