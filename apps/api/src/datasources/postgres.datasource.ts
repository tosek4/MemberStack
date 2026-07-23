import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'
import { EConfigKeys } from '../config'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, '../../.env') })

const config = {
  name: 'postgres',
  connector: 'postgresql',
  url: process.env.DATABASE_URL || '', // Added in case your environment uses a direct connection URI string
  host: EConfigKeys.dbHost || process.env.DB_HOST || '127.0.0.1',
  port: Number(EConfigKeys.dbPort || process.env.DB_PORT) || 5432,
  user: EConfigKeys.dbUser || process.env.DB_USER,
  password: EConfigKeys.dbPassword || process.env.DB_PASSWORD,
  database: EConfigKeys.dbName || process.env.DB_NAME,
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'postgres'
  static readonly defaultConfig = config

  constructor(
    @inject('datasources.config.postgres', { optional: true })
    dsConfig: object = config,
  ) {
    const finalConfig =
      Object.keys(dsConfig || {}).length > 0 ? dsConfig : config

    super(finalConfig)
  }
}
