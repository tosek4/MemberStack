import { Entity, model, property } from '@loopback/repository'

@model({
  settings: {
    postgresql: { table: 'memberrefreshtoken' },
  },
})
export class MemberRefreshToken extends Entity {
  @property({ type: 'number', id: true, generated: true })
  id?: number

  @property({ type: 'number', required: true })
  memberId: number

  @property({ type: 'string', required: true })
  tokenHash: string

  @property({ type: 'date', required: true })
  expiresAt: Date

  @property({ type: 'date' })
  revokedAt?: Date

  @property({ type: 'date', required: true, defaultFn: 'now' })
  createdAt: Date

  constructor(data?: Partial<MemberRefreshToken>) {
    super(data)
  }
}
