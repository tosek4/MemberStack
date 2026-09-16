import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Member } from '../models'
import { MemberService } from '../service'
import { UserMeResponseSchema } from './members.docs'
import { MemberListItem } from '../types'

@api({ basePath: '/members' })
export class MemberController {
  constructor(
    @service(MemberService)
    private memberService: MemberService,
  ) {}

  @get('/')
  getAllMembers(
    @param.filter(Member) filter?: Filter<Member>,
  ): Promise<MemberListItem[]> {
    return this.memberService.getAllMembers(filter)
  }

  @post('/')
  @response(200, {
    description: 'Member model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Member) } },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {
            title: 'NewMember',
            exclude: ['id'],
          }),
        },
      },
    })
    member: Omit<Member, 'id'>,
  ): Promise<Member> {
    return this.memberService.create(member)  
  }

  @get('/count')
  @response(200, {
    description: 'Member model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(Member) where?: Where<Member>): Promise<Count> {
    return this.memberService.count(where)
  }

  @get('/{id}')
  @response(200, {
    description: 'Member model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Member) } },
  })
  findById(@param.path.number('id') id: number): Promise<Member> {
    return this.memberService.findById(id)
  }

  @patch('/{id}')
  @response(204, { description: 'Member PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, { partial: true }),
        },
      },
    })
    member: Partial<Member>,
  ): Promise<void> {
    await this.memberService.updateById(id, member)
  }

  @del('/{id}')
  @response(204, { description: 'Member DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.memberService.deleteById(id)
  }
}
