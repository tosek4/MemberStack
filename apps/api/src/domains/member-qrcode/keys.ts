import { BindingKey } from '@loopback/core'
import { MemberQRCodeService } from './services/member-qrcode.service'

export const MEMBER_QR_CODE_SERVICE = BindingKey.create<MemberQRCodeService>(
  'service.member-qrcode',
)
