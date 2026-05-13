import { Entity, model, property } from '@loopback/repository'

@model()
export class Member extends Entity {
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
  })
  phone?: string

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string

  @property({
    type: 'string',
  })
  gender?: string

  @property({
    type: 'string',
  })
  emergency_contact?: string

  @property({
    type: 'string',
  })
  profile_image?: string

  @property({
    type: 'enum',
    required: true,
    members: ['active', 'inactive', 'expired', 'suspended', 'blocked'],
  })
  status?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<Member>) {
    super(data)
  }
}

export interface MemberRelations {
  // describe navigational properties here
}

export type MemberWithRelations = Member & MemberRelations
