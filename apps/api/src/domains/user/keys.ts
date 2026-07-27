import { BindingKey } from '@loopback/core'
import { UserService } from './service'

export namespace UserBindings {
  export const SERVICE = BindingKey.create<UserService>('services.UserService')
}
