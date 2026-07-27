import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Role } from '../models'
import { RoleRepository } from '../repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class RoleService {
  constructor(
    @repository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  create(data: Omit<Role, 'id'>): Promise<Role> {
    return this.roleRepository.create(data)
  }

  find(filter?: Filter<Role>): Promise<Role[]> {
    return this.roleRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Role>,
  ): Promise<Role> {
    try {
      return await this.roleRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Role ${id} not found`)
    }
  }

  count(where?: Where<Role>): Promise<Count> {
    return this.roleRepository.count(where)
  }

  async updateById(id: number, data: Partial<Role>): Promise<void> {
    await this.findById(id)
    await this.roleRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.roleRepository.deleteById(id)
  }
}
