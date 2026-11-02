import { Client } from '@loopback/testlab'
import { MemberstackApiApplication } from '../..'
import { setupApplication } from './test-helper'
import { after, before, describe, it } from 'node:test'
// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('HomePage', () => {
  let app: MemberstackApiApplication
  let client: Client

  before(async () => {
    ;({ app, client } = await setupApplication())
  })

  after(async () => {
    await app.stop()
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  it('exposes self-hosted explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/)
  })
})
