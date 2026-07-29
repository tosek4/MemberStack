import { inject, service } from '@loopback/core'
import { Count, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest'
import { User } from '../models'
import { UserService } from '../service'
import { authenticate } from '@loopback/authentication'
import { SecurityBindings, securityId, UserProfile } from '@loopback/security'
import { CreateUserDto, UpdateUserDto } from '../types'
import {
  CountUserResponseSchema,
  CreateUserRequestBody,
  createUserResponseSchema,
  deleteUserByIdResponseSchema,
  getUserByIdResponseSchema,
  getUserResponseSchema,
  updateUserByIdResponseSchema,
  UpdateUserRequestBody,
  UserLogoutResponseSchema,
} from './user.docs'

@authenticate('jwt')
@api({ basePath: '/users' })
export class UserController {
  constructor(
    @service(UserService)
    private userService: UserService,
  ) {}

  @post('/create')
  @response(200, createUserResponseSchema)
  create(
    @requestBody(CreateUserRequestBody)
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user)
  }

  @put('/logout')
  @response(204, UserLogoutResponseSchema)
  async logout(
    @inject(SecurityBindings.USER)
    currentUser: UserProfile,
  ): Promise<void> {
    const userId = Number(currentUser[securityId])

    await this.userService.logout(userId)
  }

  @get('/count')
  @response(200, CountUserResponseSchema)
  count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userService.count(where)
  }

  @get('/')
  @response(200, getUserResponseSchema)
  find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userService.find(filter)
  }

  @get('/{id}')
  @response(200, getUserByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<User> {
    return this.userService.findById(id)
  }

  @del('/{id}')
  @response(204, deleteUserByIdResponseSchema)
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userService.deleteById(id)
  }

  @patch('{id}')
  @response(204, updateUserByIdResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(UpdateUserRequestBody)
    user: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateById(id, user)
  }
}
