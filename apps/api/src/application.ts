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
import { EConfigKeys } from './config'
import { RoleRepository } from './domains/role/repositories'
import { UserRepository } from './domains/user/repositories'
import { AttendanceRepository } from './domains/attendance/repositories'
import { MemberRepository } from './domains/member/repositories'
import { MemberPlanRepository } from './domains/member-plan/repositories'
import { MemberSubscriptionRepository } from './domains/member-subscription/repositories'
import { PaymentRepository } from './domains/payment/repositories'
import { RefreshTokenRepository } from './domains/refresh-token/repositories'
import { PostgresDataSource } from './datasources'
import {
  AuthBindings,
  AuthController,
  AuthService,
  JwtService,
  PasswordHasherService,
} from './authentication'
import { RoleService } from './domains/role/service'
import { UserService } from './domains/user/service'
import { MemberService } from './domains/member/service'
import { MemberPlanService } from './domains/member-plan/service'
import { MemberSubscriptionService } from './domains/member-subscription/service'
import { PaymentService } from './domains/payment/service'
import { AttendanceService } from './domains/attendance/service'
import { RoleController } from './domains/role/controllers'
import { UserController } from './domains/user/controllers'
import { MemberController } from './domains/member/controllers'
import { MemberPlanController } from './domains/member-plan/controllers'
import { MemberSubscriptionController } from './domains/member-subscription/controllers'
import { PaymentController } from './domains/payment/controllers'
import { AttendanceController } from './domains/attendance/controllers'

export { ApplicationConfig }

export class MemberstackApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    this.repository(AttendanceRepository)
    this.repository(MemberRepository)
    this.repository(MemberPlanRepository)
    this.repository(MemberSubscriptionRepository)
    this.repository(PaymentRepository)
    this.repository(RefreshTokenRepository)
    this.repository(RoleRepository)
    this.repository(UserRepository)

    this.setupAuth()
    this.setupServices()
    this.setupControllers()

    //Database connection
    this.dataSource(PostgresDataSource, 'postgres')

    // Set up the custom sequence
    this.sequence(MySequence)

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'))

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    })
    this.component(RestExplorerComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    }
  }

  private setupAuth() {
    this.bind(AuthBindings.TOKEN_SECRET).to(EConfigKeys.jwtSecret)
    this.bind(AuthBindings.TOKEN_EXPIRES_IN).to(EConfigKeys.jwtAccessExpiresIn)
    this.bind(AuthBindings.REFRESH_SECRET).to(EConfigKeys.jwtRefreshSecret)
    this.bind(AuthBindings.REFRESH_EXPIRES_DAYS).to(
      EConfigKeys.jwtRefreshExpiresDays,
    )

    this.bind(AuthBindings.PASSWORD_HASHER).toClass(PasswordHasherService)
    this.bind(AuthBindings.JWT_SERVICE).toClass(JwtService)
    this.bind(AuthBindings.AUTH_SERVICE).toClass(AuthService)
    this.service(PasswordHasherService)
    this.service(JwtService)
    this.service(AuthService)
  }

  private setupServices() {
    this.service(RoleService)
    this.service(UserService)
    this.service(MemberService)
    this.service(MemberPlanService)
    this.service(MemberSubscriptionService)
    this.service(PaymentService)
    this.service(AttendanceService)
  }

  private setupControllers() {
    this.controller(AuthController)
    this.controller(RoleController)
    this.controller(UserController)
    this.controller(MemberController)
    this.controller(MemberPlanController)
    this.controller(MemberSubscriptionController)
    this.controller(PaymentController)
    this.controller(AttendanceController)
  }
}
