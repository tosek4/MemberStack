import { getModelSchemaRef } from '@loopback/rest'
import { MemberQRCode } from '../models/member-qrcode.model'

export const CreateMemberQRCodeResponseSchema = {
  description: 'Created member QR code',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          qrCode: getModelSchemaRef(MemberQRCode),
          token: {
            type: 'string',
          },
          image: {
            type: 'string',
            description: 'QR code image as a base64 data URL',
          },
        },
      },
    },
  },
}
