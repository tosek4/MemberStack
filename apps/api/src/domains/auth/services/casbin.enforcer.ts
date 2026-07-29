import * as casbin from 'casbin'
import path from 'path'
import { Client } from 'pg'
import { BasicAdapter } from 'casbin-basic-adapter'
import { EConfigKeys } from '../../../config'

export class CasbinEnforcer {
  private enforcer: casbin.Enforcer

  async getEnforcer() {
    if (!this.enforcer) {
      this.enforcer = await this.initEnforcer()
    }
    return this.enforcer
  }

  async initEnforcer() {
    const conf = path.join(
      __dirname,
      './../../../../src/fixtures/rbac_model.conf',
    )

    // TODO: Switch to Typeorm Adapter after the juggler refactor
    const adapter = await BasicAdapter.newAdapter(
      'pg',
      new Client({
        host: EConfigKeys.dbHost,
        port: +EConfigKeys.dbPort ?? 5432,
        user: EConfigKeys.dbUser,
        password: EConfigKeys.dbPassword,
        database: EConfigKeys.dbName,
      }),
    )
    return casbin.newEnforcer(conf, adapter)
  }
}
