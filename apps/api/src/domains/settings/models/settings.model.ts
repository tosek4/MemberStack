import { Entity, model, property } from '@loopback/repository'

@model()
export class Settings extends Entity {
  @property({ type: 'number', id: true, required: true })
  id: number

  @property({ type: 'string', required: true, })
  gymName: string

  @property({ type: 'string', required: true,  })
  email: string

  @property({ type: 'string', required: true,  })
  phone: string

  @property({
    type: 'string',
    required: true,
  
  })
  address: string

  @property({
    type: 'string',
    required: true,
    default: 'EUR',
    jsonSchema: { enum: ['EUR', 'USD', 'GBP', 'MKD'] },
  })
  currency: string

  @property({
    type: 'number',
    required: true,
    default: 1,
    jsonSchema: { minimum: 1, maximum: 36 },
  })
  defaultDuration: number

  @property({
    type: 'number',
    required: true,
    default: 7,
    jsonSchema: { minimum: 0, maximum: 365 },
  })
  expiringSoonDays: number

  @property({
    type: 'number',
    required: true,
    default: 0,
    jsonSchema: { minimum: 0, maximum: 365 },
  })
  gracePeriodDays: number

  @property({
    type: 'number',
    required: true,
    default: 60,
    jsonSchema: { minimum: 5, maximum: 1440 },
  })
  sessionTimeout: number

  @property({ type: 'date', required: true, defaultFn: 'now' })
  createdAt: Date

  @property({ type: 'date', required: true, defaultFn: 'now' })
  updatedAt: Date

  constructor(data?: Partial<Settings>) {
    super(data)
  }
}
