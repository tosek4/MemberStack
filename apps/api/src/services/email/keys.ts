import { BindingKey } from '@loopback/core'
import { EmailService } from './email.services'

export const EMAIL_SERVICE = BindingKey.create<EmailService>('service.email')
