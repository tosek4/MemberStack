import { BindingScope, injectable } from '@loopback/core'
import { compare, hash } from 'bcrypt'

@injectable({ scope: BindingScope.TRANSIENT })
export class PasswordHasherService {
  private readonly rounds = 10

  hashPassword(password: string): Promise<string> {
    return hash(password, this.rounds)
  }

  comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash)
  }
}
