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
import { RoleRepository } from './domains/role/repositories'
import { UserRepository } from './domains/user/repositories'
import { AttendanceRepository } from './domains/attendance/repositories'
import { MemberRepository } from './domains/member/repositories'
import { MemberPlanRepository } from './domains/member-plan/repositories'
import { MemberSubscriptionRepository } from './domains/member-subscription/repositories'
import { PaymentRepository } from './domains/payment/repositories'
import { RefreshTokenRepository } from './domains/refresh-token/repositories'
import { PostgresDataSource } from './datasources'

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
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    }
  }
}
