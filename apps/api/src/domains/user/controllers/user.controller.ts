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
  SchemaObject,
} from '@loopback/rest'
import { User } from '../models'
import { UserService } from '../service'
import { CreateUserDto, UpdateUserDto } from '../types'
import { createUserSchema, updateUserSchema } from '../schemas'

export class UserController {
  constructor(
    @service(UserService)
    private userService: UserService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  create(
    @requestBody({
      content: { 'application/json': { schema: createUserSchema } },
    })
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user)
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userService.count(where)
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: { type: 'array', items: getModelSchemaRef(User) },
      },
    },
  })
  find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userService.find(filter)
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  findById(@param.path.number('id') id: number): Promise<User> {
    return this.userService.findById(id)
  }

  @patch('/users/{id}')
  @response(204, { description: 'User PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: { 'application/json': { schema: updateUserSchema } },
    })
    user: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateById(id, user)
  }

  @del('/users/{id}')
  @response(204, { description: 'User DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userService.deleteById(id)
  }
}
