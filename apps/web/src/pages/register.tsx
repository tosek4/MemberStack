import React, { ReactElement } from 'react'
import { Register } from '@/components/RegisterScreen/Register'

const LogInPage = () => {
  return <Register />
}

LogInPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default LogInPage
