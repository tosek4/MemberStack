import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Settings } from '../models'

export class SettingsRepository extends DefaultCrudRepository<
  Settings,
  typeof Settings.prototype.id
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Settings, dataSource)
  }
}
