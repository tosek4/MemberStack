import { BindingKey } from '@loopback/core'
import { MemberQRCodeService } from './services/member-qrcode.service'

export const MEMBER__QR_CODE_SERVICE = BindingKey.create<MemberQRCodeService>(
  'service.member-qrcode',
)
