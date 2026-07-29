import { BootMixin } from '@loopback/boot'
import { ApplicationConfig } from '@loopback/core'
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { PostgresDataSource } from './datasources'
import { UserService } from './domains/user/service'
import { AUTH_SERVICE, JWT_EXPIRES_IN, JWT_SECRET, JWT_SERVICE, PASSWORD_HASHER } from './domains/auth/key'
import { USERS_SERVICE } from './domains/user/keys'
import { AuthService } from './domains/auth/services/auth.service'
import { JWTAuthenticationComponent } from '@loopback/authentication-jwt'
import { WinstonLogger } from '@loopback/logging'
import { PasswordHasherService } from './domains/auth/services/password-hasher.service'
import { JwtService } from './domains/auth/services/jwt.service'
import { RefreshTokenService } from './domains/refresh-token/service/refresh-token.service'
import { AuthenticationComponent } from '@loopback/authentication'
import { EConfigKeys } from './config'
export { ApplicationConfig }

export class MemberstackApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  public logger: WinstonLogger

  constructor(options: ApplicationConfig = {}) {
    super(options)

    this.sequence(MySequence)

    // Customize @loopback/rest-explorer configuration here
    this.component(RestExplorerComponent)

    this.static('/', path.join(__dirname, '../public'))

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    })

    //Database connection
    this.dataSource(PostgresDataSource, 'postgres')

    this.setupBindings()
    this.setupComponents()

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        dirs: ['domains'],
        extensions: ['.controller.ts'],
        nested: true,
      },
      repositories: {
        dirs: ['domains'],
        extensions: ['.repository.ts'],
        nested: true,
      },
    }
  }

  setupBindings(): void {
    this.bind(USERS_SERVICE).toClass(UserService)
    this.bind(AUTH_SERVICE).toClass(AuthService)
    this.bind(PASSWORD_HASHER).toClass(PasswordHasherService)
    this.bind(JWT_SERVICE).toClass(JwtService)
    this.bind('services.refreshToken').toClass(RefreshTokenService)
    this.bind(JWT_SECRET).to(EConfigKeys.jwtSecret)
    this.bind(JWT_EXPIRES_IN).to(EConfigKeys.jwtAccessExpiresIn)
  }

  setupComponents() {
    this.component(RestExplorerComponent)
    this.component(JWTAuthenticationComponent)
    this.component(AuthenticationComponent)
  }
}
