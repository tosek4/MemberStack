import { Client, expect } from '@loopback/testlab'
import { MemberstackApiApplication } from '../..'
import { setupApplication } from './test-helper'
import { after, before, describe, it } from 'node:test'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('PingController', () => {
  let app: MemberstackApiApplication
  let client: Client

  before(async () => {
    ;({ app, client } = await setupApplication())
  })

  after(async () => {
    await app.stop()
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200)
    expect(res.body).to.containEql({ greeting: 'Hello from LoopBack' })
  })
})
