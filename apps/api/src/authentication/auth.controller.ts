import { inject, service } from '@loopback/core'
import { repository } from '@loopback/repository'
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  response,
  HttpErrors,
  Request,
  RestBindings,
  SchemaObject,
} from '@loopback/rest'
import { User } from '../domains/user/models'
import {
  AuthResult,
  Credentials,
  CreateUserDto,
  TokenPair,
} from '../domains/user/types'
import { UserRepository } from '../domains/user/repositories'
import { AuthService } from './auth.service'
import { JwtService } from './jwt.service'
import { AuthBindings } from './keys'

const credentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
}

const registerSchema: SchemaObject = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'password', 'roleId'],
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    phone: { type: 'string' },
    isActive: { type: 'boolean' },
    roleId: { type: 'number' },
  },
}

const refreshSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: { type: 'string' },
  },
}

export class AuthController {
  constructor(
    @service(AuthService)
    private authService: AuthService,
    @inject(AuthBindings.JWT_SERVICE)
    private jwtService: JwtService,
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  @post('/auth/register')
  @response(200, {
    description: 'Register a new user',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  register(
    @requestBody({
      content: { 'application/json': { schema: registerSchema } },
    })
    body: CreateUserDto,
  ): Promise<User> {
    return this.authService.register(body)
  }

  @post('/auth/login')
  @response(200, {
    description: 'Login and receive access + refresh tokens',
  })
  login(
    @requestBody({
      content: { 'application/json': { schema: credentialsSchema } },
    })
    credentials: Credentials,
  ): Promise<AuthResult> {
    return this.authService.login(credentials)
  }

  @post('/auth/refresh')
  @response(200, {
    description: 'Refresh access token using a valid refresh token',
  })
  refresh(
    @requestBody({
      content: { 'application/json': { schema: refreshSchema } },
    })
    body: { refreshToken: string },
  ): Promise<TokenPair> {
    return this.authService.refresh(body.refreshToken)
  }

  @post('/auth/logout')
  @response(204, { description: 'Revoke the given refresh token' })
  async logout(
    @requestBody({
      content: { 'application/json': { schema: refreshSchema } },
    })
    body: { refreshToken: string },
  ): Promise<void> {
    await this.authService.logout(body.refreshToken)
  }

  @get('/auth/me')
  @response(200, {
    description: 'Current authenticated user',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async me(): Promise<User> {
    const authHeader = this.request.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HttpErrors.Unauthorized('Missing Bearer token')
    }

    const token = authHeader.slice('Bearer '.length)
    const payload = this.jwtService.verifyAccessToken(token)

    try {
      return await this.userRepository.findById(payload.sub)
    } catch {
      throw new HttpErrors.Unauthorized('User not found')
    }
  }
}
