import React, { ReactElement } from 'react'
import { Login } from '@/domains/Auth/LoginScreen/Login'

const LogInPage = () => {
  return <Login />
}

LogInPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default LogInPage
