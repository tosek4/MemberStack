import { Entity, model, property } from '@loopback/repository'

@model()
export class User extends Entity {
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
  roleId: string

  @property({
    type: 'string',
    required: true,
  })
  firstName: string

  @property({
    type: 'string',
    required: true,
  })
  lastName: string

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string

  @property({
    type: 'string',
    required: true,
  })
  passwordHash: string

  @property({
    type: 'string',
  })
  phone?: string

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<User>) {
    super(data)
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations
