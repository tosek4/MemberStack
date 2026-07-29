import { inject, service } from '@loopback/core'
import { repository } from '@loopback/repository'
import {
  post,
  requestBody,
  response,
  Request,
  RestBindings,
  api,
  get,
  getModelSchemaRef,
  HttpErrors,
} from '@loopback/rest'
import { User } from '../../user/models'
import { AuthResult, Credentials, CreateUserDto, TokenPair } from '../types/dto'
import { UserRepository } from '../../user/repositories'
import { AuthService } from '../services/auth.service'
import {
  UserLoginResponseSchema,
  UserRegisterRequestBody,
  UserRegisterResponseSchema,
  UserLoginRequestBody,
  UserMeResponseSchema,
} from './auth.docs'
import { JwtService } from '../services/jwt.service'

@api({ basePath: '/auth' })
export class AuthController {
  constructor(
    @service(AuthService)
    private authService: AuthService,
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
    @service(JwtService)
    private jwtService: JwtService,
  ) {}

  @post('register')
  @response(200, UserRegisterResponseSchema)
  register(
    @requestBody(UserRegisterRequestBody)
    body: CreateUserDto,
  ): Promise<User> {
    return this.authService.register(body)
  }

  @post('/login')
  @response(200, UserLoginResponseSchema)
  login(
    @requestBody(UserLoginRequestBody)
    credentials: Credentials,
  ): Promise<AuthResult> {
    return this.authService.login(credentials)
  }

  @get('/me')
  @response(200, UserMeResponseSchema)
  async me(): Promise<User> {
    const authHeader = this.request.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HttpErrors.Unauthorized('Missing Bearer token')
    }

    const token = authHeader.slice('Bearer '.length)

    const payload = this.jwtService.verifyAccessToken(token)
    try {
      return await this.userRepository.findById(parseInt(payload.id))
    } catch {
      throw new HttpErrors.Unauthorized('User not found')
    }
  }
}
