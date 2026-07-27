import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Role } from '../models'
import { RoleService } from '../service'

export class RoleController {
  constructor(
    @service(RoleService)
    private roleService: RoleService,
  ) {}

  @post('/roles')
  @response(200, {
    description: 'Role model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Role) } },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {
            title: 'NewRole',
            exclude: ['id'],
          }),
        },
      },
    })
    role: Omit<Role, 'id'>,
  ): Promise<Role> {
    return this.roleService.create(role)
  }

  @get('/roles/count')
  @response(200, {
    description: 'Role model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(Role) where?: Where<Role>): Promise<Count> {
    return this.roleService.count(where)
  }

  @get('/roles')
  @response(200, {
    description: 'Array of Role model instances',
    content: {
      'application/json': {
        schema: { type: 'array', items: getModelSchemaRef(Role) },
      },
    },
  })
  find(@param.filter(Role) filter?: Filter<Role>): Promise<Role[]> {
    return this.roleService.find(filter)
  }

  @get('/roles/{id}')
  @response(200, {
    description: 'Role model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Role) } },
  })
  findById(@param.path.number('id') id: number): Promise<Role> {
    return this.roleService.findById(id)
  }

  @patch('/roles/{id}')
  @response(204, { description: 'Role PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, { partial: true }),
        },
      },
    })
    role: Partial<Role>,
  ): Promise<void> {
    await this.roleService.updateById(id, role)
  }

  @del('/roles/{id}')
  @response(204, { description: 'Role DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roleService.deleteById(id)
  }
}
