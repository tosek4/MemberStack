import { BindingKey } from '@loopback/core'
import { RoleService } from './service'

export namespace RoleBindings {
  export const SERVICE = BindingKey.create<RoleService>('services.RoleService')
}

export const ROLES_SERVICE = BindingKey.create<RoleService>(
  'services.RoleService',
)
