import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberQRCode } from '../models/member-qrcode.model'


export class MemberQRCodeRepository extends DefaultCrudRepository<
  MemberQRCode,
  typeof MemberQRCode.prototype.id
> {
  constructor(
    @inject('datasources.postgres')
    dataSource: PostgresDataSource,
  ) {
    super(MemberQRCode, dataSource)
  }
}
