import { inject, service } from '@loopback/core'
import {
  api,
  get,
  post,
  requestBody,
  response,
  RestBindings,
  Request,
  RequestBodyObject,
  param,
  patch,
} from '@loopback/rest'

import { MemberAuthService } from '../service/member-auth.service'
import {
  CreateMemberCodeRequestSchema,
  LogoutRequestSchema,
  MemberCheckInHistoryRequestSchema,
  MeResponseSchema,
  MyQrCodeResponseSchema,
  RefreshRequestSchema,
  UpdateMemberProfileRequestSchema,
  VerifyCodeBodyRequestSchema,
} from './member-auth.docs'
import { MemberCheckInHistoryResponse, MemberData, MemberSubscriptionData } from '../types'
import { extractBearerToken } from '../utils'

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

  @get('/check-ins')
  @response(200, MemberCheckInHistoryRequestSchema)
  async getMemberCheckInHistory(
    @param.query.number('limit', { required: false }) limit = 10,
    @param.query.number('offset', { required: false }) offset = 0,
  ): Promise<MemberCheckInHistoryResponse> {
    const token = extractBearerToken(this.request.headers.authorization)

    return this.memberAuthService.getMemberCheckInHistory(token, limit, offset)
  }

  @patch('/me')
  @response(200, MeResponseSchema)
  async updateMe(
    @requestBody(UpdateMemberProfileRequestSchema as Partial<RequestBodyObject>)
    body: {
      firstName?: string
      lastName?: string
      phone?: string | null
    },
  ): Promise<MemberData> {
    const token = extractBearerToken(this.request.headers.authorization)

    return this.memberAuthService.updateMemberProfile(token, body)
  }
}
