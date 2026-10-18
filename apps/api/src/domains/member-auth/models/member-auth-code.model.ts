import { Entity, model, property } from '@loopback/repository'

@model({
  settings: {
    postgresql: { table: 'memberauthcode' },
  },
})
export class MemberAuthCode extends Entity {
  @property({ type: 'number', id: true, generated: true })
  id?: number

  @property({ type: 'string', required: true })
  email: string

  @property({ type: 'number' })
  memberId?: number

  @property({ type: 'string' })
  codeHash?: string

  @property({ type: 'date' })
  expiresAt?: Date

  @property({ type: 'date', required: true })
  requestedAt: Date

  @property({ type: 'number', required: true, default: 0 })
  attempts: number

  constructor(data?: Partial<MemberAuthCode>) {
    super(data)
  }
}
