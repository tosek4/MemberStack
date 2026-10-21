import { inject, service } from '@loopback/core'
import {
  api,
  get,
  post,
  requestBody,
  response,
  RestBindings,
  Request,
} from '@loopback/rest'

import { MemberAuthService } from '../service/member-auth.service'
import {
  CreateMemberCodeRequestSchema,
  LogoutRequestSchema,
  MeResponseSchema,
  MyQrCodeResponseSchema,
  RefreshRequestSchema,
  VerifyCodeBodyRequestSchema,
} from './member-auth.docs'
import { MemberData, MemberSubscriptionData } from '../types'
import { extractBearerToken, verifyMemberAccessToken } from '../utils'

@api({ basePath: '/member-auth' })
export class MemberAuthController {
  constructor(
    @service(MemberAuthService)
    private memberAuthService: MemberAuthService,

    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  @post('/request-code')
  @response(204, {
    description: 'Request accepted, whether or not the member exists',
  })
  async requestCode(
    @requestBody(CreateMemberCodeRequestSchema)
    body: {
      email: string
    },
  ): Promise<void> {
    await this.memberAuthService.createRequestCode(body.email)
  }

  @post('/verify-code')
  @response(200, {
    description: 'Member access and refresh tokens',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['accessToken', 'refreshToken'],
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
        },
      },
    },
  })
  async verifyCode(
    @requestBody(VerifyCodeBodyRequestSchema)
    body: {
      email: string
      code: string
    },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.memberAuthService.verifyCode(body.email, body.code)
  }

  @post('/refresh')
  @response(200, {
    description: 'Rotated member access and refresh tokens',
  })
  async refresh(
    @requestBody(RefreshRequestSchema)
    body: {
      refreshToken: string
    },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.memberAuthService.refresh(body.refreshToken)
  }

  @get('/me')
  @response(200, MeResponseSchema)
  async me(): Promise<MemberData> {
    const token = extractBearerToken(this.request.headers.authorization)
    return this.memberAuthService.getMemberInfo(token)
  }

  @get('/qr')
  @response(200, MyQrCodeResponseSchema)
  async myQrCode(): Promise<{ token: string }> {
    const token = extractBearerToken(this.request.headers.authorization)
    return this.memberAuthService.getMemberQrCode(token)
  }

  @get('/subscription-history')
  @response(200, MyQrCodeResponseSchema)
  async mySubscriptionHistory(): Promise<{
    subscriptions: MemberSubscriptionData[]
  }> {
    const token = extractBearerToken(this.request.headers.authorization)
    return this.memberAuthService.getMemberSubscriptionHistory(token)
  }

  @post('/logout')
  @response(204, { description: 'Refresh token revoked' })
  async logout(
    @requestBody(LogoutRequestSchema)
    body: {
      refreshToken: string
    },
  ): Promise<void> {
    await this.memberAuthService.logout(body.refreshToken)
  }
}
