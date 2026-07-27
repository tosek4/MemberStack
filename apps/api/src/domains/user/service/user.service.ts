import { BindingScope, inject, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { AuthBindings } from '../../../authentication/keys'
import { PasswordHasherService } from '../../../authentication/password-hasher.service'
import { User } from '../models'
import { UserRepository } from '../repositories'
import { CreateUserDto, UpdateUserDto } from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject(AuthBindings.PASSWORD_HASHER)
    private passwordHasher: PasswordHasherService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    })
    if (existing) {
      throw new HttpErrors.Conflict('Email already registered')
    }

    const passwordHash = await this.passwordHasher.hashPassword(data.password)

    return this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      phone: data.phone,
      isActive: data.isActive ?? true,
      roleId: data.roleId,
    })
  }

  find(filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    try {
      return await this.userRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`User ${id} not found`)
    }
  }

  count(where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where)
  }

  async updateById(id: number, data: UpdateUserDto): Promise<void> {
    await this.findById(id)

    const update: Partial<User> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      isActive: data.isActive,
      roleId: data.roleId,
    }

    // Remove undefined keys
    Object.keys(update).forEach(key => {
      if (update[key] === undefined) {
        delete update[key]
      }
    })

    if (data.password) {
      update.passwordHash = await this.passwordHasher.hashPassword(data.password)
    }

    await this.userRepository.updateById(id, update)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.userRepository.deleteById(id)
  }
}
