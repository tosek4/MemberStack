import { post, param, response, api, get } from '@loopback/rest'
import { authenticate } from '@loopback/authentication'
import { service } from '@loopback/core'

import { MemberQRCodeService } from '../services/member-qrcode.service'
import { CreateMemberQRCodeResponseSchema } from './member-qrcode.docs'

@authenticate('jwt')
@api({ basePath: '/member-qrcodes' })
export class MemberQRCodeController {
  constructor(
    @service(MemberQRCodeService)
    private memberQRCodeService: MemberQRCodeService,
  ) {}

  @post('/{memberId}')
  @response(201, CreateMemberQRCodeResponseSchema)
  async createQRCode(@param.path.number('memberId') memberId: number) {
    return this.memberQRCodeService.createQRCode(memberId)
  }

  @post('/{id}/revoke')
  @response(204)
  async revokeQRCode(@param.path.number('id') id: number): Promise<void> {
    await this.memberQRCodeService.revokeQRCode(id)
  }
}
