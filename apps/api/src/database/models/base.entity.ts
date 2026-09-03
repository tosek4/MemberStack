import { Entity, property } from '@loopback/repository'

export class BaseEntity extends Entity {
  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
    name: 'createdAt',
  })
  createdAt: string

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
    name: 'updatedAt',
  })
  updatedAt: string
  constructor(data?: Partial<BaseEntity>) {
    super(data)
  }
}
