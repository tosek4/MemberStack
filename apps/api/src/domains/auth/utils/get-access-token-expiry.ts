export const getAccessTokenExpiry = (expiresIn: number) => {
  return Date.now() + expiresIn * 1000
}
