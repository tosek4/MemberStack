import { BindingScope, inject, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { PasswordHasherService } from '../../auth/services/password-hasher.service'
import { User } from '../models'
import { UserRepository } from '../repositories'
import { CreateUserDto, UpdateUserDto } from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    })
    if (existing) {
      throw new HttpErrors.Conflict('Email already registered')
    }

    return this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: data.password,
      phone: data.phone,
      isActive: data.isActive ?? true,
      roleId: data.roleId,
    })
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } })
    } catch {
      throw new HttpErrors.NotFound(`User ${email} not found`)
    }
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

  async updateUserToken(userId: number, deviceToken: string) {
    await this.userRepository.updateById(userId, { deviceToken })
  }

  async logout(userId: number) {
    return this.userRepository.updateById(userId, { deviceToken: '' })
  }

  async updateById(id: number, data: UpdateUserDto): Promise<void> {
    await this.findById(id)
    const { password, ...rest } = data

    const update: Partial<User> = {
      firstName: rest.firstName,
      lastName: rest.lastName,
      email: rest.email,
      phone: rest.phone,
      isActive: rest.isActive,
      roleId: rest.roleId,
    }

    // Remove undefined keys
    Object.keys(update).forEach((key) => {
      if (update[key] === undefined) {
        delete update[key]
      }
    })

    await this.userRepository.updateById(id, update)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.userRepository.deleteById(id)
  }
}
