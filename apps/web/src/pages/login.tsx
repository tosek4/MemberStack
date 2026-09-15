import React, { ReactElement } from 'react'

import { Login } from '@/domains/Auth/LoginScreen/Login'

const LoginPage = () => {
  return <Login />
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default LoginPage
