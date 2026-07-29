import { BindingKey } from '@loopback/core'
import { UserService } from './service/user.service'

export const USERS_SERVICE = BindingKey.create<UserService>('service.user')
