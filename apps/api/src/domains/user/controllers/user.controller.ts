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
import { SecurityBindings, securityId } from '@loopback/security'
import {
  CreateUserDto,
  UpdateUserDto,
  UserListFilters,
  UserProfile,
  UserStatus,
} from '../types'
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
import { authorize } from '@loopback/authorization'
import { AppRole } from '../../../enums/app-role.enum'

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

  @authorize({
    allowedRoles: [AppRole.ADMIN, AppRole.SUPER_ADMIN],
    voters: ['authorization.authorizers.role'],
  })
  @get('/count')
  @response(200, CountUserResponseSchema)
  count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userService.count(where)
  }

  @get('/')
  @response(200, getUserResponseSchema)
  find(
    @param.query.string('search') search?: string,
    @param.query.string('role') role?: string,
    @param.query.string('status') status?: UserStatus,
  ): Promise<User[]> {
    return this.userService.find({
      search,
      role,
      status,
    })
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
