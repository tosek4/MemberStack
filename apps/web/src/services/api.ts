import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { authStorage, refreshAccessToken } from '@domain/Auth/services'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = authStorage.getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

let isRefreshing = false

let refreshPromise: Promise<string> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error)
    }

    const storedRefreshToken = authStorage.getRefreshToken()

    if (!storedRefreshToken) {
      authStorage.clear()

      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!isRefreshing) {
        isRefreshing = true

        refreshPromise = refreshAccessToken(storedRefreshToken)
          .then((response) => {
            authStorage.setAccessToken(response.accessToken)

            return response.accessToken
          })
          .finally(() => {
            isRefreshing = false
            refreshPromise = null
          })
      }

      const newAccessToken = await refreshPromise

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      authStorage.clear()

      return Promise.reject(refreshError)
    }
  },
)
