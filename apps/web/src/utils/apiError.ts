import axios from 'axios'

interface ApiErrorResponse {
  message?: string
  error?: {
    message?: string
  }
}

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return error instanceof Error
      ? error.message
      : 'Something went wrong. Please try again.'
  }

  // Axios request failed without receiving a response
  if (!error.response) {
    return 'Unable to connect to the server. Please check your connection.'
  }

  const status = error.response.status
  const responseData = error.response.data
  const apiMessage = responseData?.error?.message ?? responseData?.message

  if (apiMessage) {
    return apiMessage
  }

  switch (status) {
    case 400:
      return 'The request is invalid. Please check your input.'
    case 401:
      return 'Unauthorized access. Please log in again.'
    case 403:
      return 'You do not have permission to perform this action.'
    case 404:
      return 'The requested resource was not found.'
    case 422:
      return 'Some of the submitted information is invalid.'
    case 429:
      return 'Too many requests. Please try again later.'
    case 500:
    case 502:
    case 503:
    case 504:
      return 'A server error occurred. Please try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
