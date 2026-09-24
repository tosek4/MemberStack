import { service } from '@loopback/core'
import { api, get, post, requestBody, response } from '@loopback/rest'
import { authenticate } from '@loopback/authentication'
import { DailyVisitService } from '../service'
import {  CreateDailyVisitPayload } from '../types'
import { CreateDailyVisitRequestSchema } from './daily-visit.docs'

@authenticate('jwt')
@api({ basePath: '/daily-visits' })
export class DailyVisitController {
  constructor(
    @service(DailyVisitService)
    private dailyVisitService: DailyVisitService,
  ) {}

  @get('/')
  @response(200, {
    description: 'Get all daily visits',
  })
  async find() {
    return this.dailyVisitService.find()
  }

  @get('/count')
  @response(200, {
    description: 'Get the count of all daily visits',
  })
  async findCount() {
    return this.dailyVisitService.findCount()
  }

  @post('/')
  @response(200, {
    description: 'Create a new daily visit',
  })
  async createDailyVisit(
    @requestBody(CreateDailyVisitRequestSchema)
    data: CreateDailyVisitPayload,
  ) {
    return this.dailyVisitService.createDailyVisit(data)
  }
}
