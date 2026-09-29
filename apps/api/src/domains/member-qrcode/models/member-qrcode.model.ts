import { belongsTo, Entity, model, property } from '@loopback/repository'
import { Member } from '../../member/models'

export type MemberQRCodeStatus = 'active' | 'revoked'

@model()
export class MemberQRCode extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @belongsTo(() => Member)
  memberId: number

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'revoked'],
    },
  })
  status: MemberQRCodeStatus

  @property({
    type: 'string',
    required: true,
  })
  tokenHash: string

  @property({
    type: 'date',
    required: true,
  })
  issuedAt: string

  @property({
    type: 'date',
  })
  revokedAt?: string

  @property({
    type: 'number',
  })
  createdByUserId?: number

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: Date

  constructor(data?: Partial<MemberQRCode>) {
    super(data)
  }
}
