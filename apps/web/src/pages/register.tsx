import React, { ReactElement } from 'react'
import { Register } from '@/domains/Auth/RegisterScreen/Register'

const LogInPage = () => {
  return <Register />
}

LogInPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default LogInPage
