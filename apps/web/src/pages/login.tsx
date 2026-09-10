import React, { ReactElement } from 'react'
import { Login } from '@components/LoginScreen/Login'

const LogInPage = () => {
  return <Login />
}

LogInPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default LogInPage
