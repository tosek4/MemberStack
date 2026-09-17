import { service } from '@loopback/core'
import { Count, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Member } from '../models'
import { MemberService } from '../service'
import { MemberListItem } from '../types'
import {
  CreateMemberRequestSchema,
  CreateMemberResponseSchema,
  MemberGetByIdResponseSchema,
  MembersCountResponseSchema,
  MemberUpdateResponseSchema,
  UpdateMemberRequestSchema,
} from './members.docs'

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
  @response(200, CreateMemberResponseSchema)
  create(
    @requestBody(CreateMemberRequestSchema)
    member: Omit<Member, 'id'>,
  ): Promise<Member> {
    return this.memberService.create(member)
  }

  @get('/count')
  @response(200, MembersCountResponseSchema)
  count(@param.where(Member) where?: Where<Member>): Promise<Count> {
    return this.memberService.count(where)
  }

  @get('/{id}')
  @response(200, MemberGetByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<Member> {
    return this.memberService.findById(id)
  }

  @patch('/{id}')
  @response(204, MemberUpdateResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(UpdateMemberRequestSchema)
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
