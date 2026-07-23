import { Entity, hasMany, model, property } from '@loopback/repository'
import { User } from '../../user/models'
import { RoleRelations } from '../types'

@model()
export class Role extends Entity {
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
  name: string

  @property({
    type: 'string',
  })
  description?: string

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: string

  // relations
  @hasMany(() => User)
  users?: User[]

  constructor(data?: Partial<Role>) {
    super(data)
  }
}

export type RoleWithRelations = Role & RoleRelations
