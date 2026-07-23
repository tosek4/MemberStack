import { belongsTo, Entity, model, property } from '@loopback/repository'
import { User } from '../../user/models'
import { RefreshTokenRelations } from '../types'

@model()
export class RefreshToken extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'string',
    required: true,
  })
  token: string

  @property({
    type: 'date',
    required: true,
  })
  expiresAt: string

  @property({
    type: 'date',
  })
  revokedAt?: string

  // relations
  @belongsTo(() => User)
  userId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<RefreshToken>) {
    super(data)
  }
}

export type RefreshTokenWithRelations = RefreshToken & RefreshTokenRelations
