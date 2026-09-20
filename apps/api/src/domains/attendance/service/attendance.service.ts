import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Attendance } from '../models'
import { AttendanceRepository } from '../repositories'
import {
  AttendanceListFilters,
  AttendanceListItem,
  AttendanceStats,
} from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class AttendanceService {
  constructor(
    @repository(AttendanceRepository)
    private attendanceRepository: AttendanceRepository,
  ) {}

  async find(filters?: AttendanceListFilters): Promise<AttendanceListItem[]> {
    const attendanceIds =
      await this.attendanceRepository.findIdsForList(filters)

    if (attendanceIds.length === 0) {
      return []
    }

    const attendances = await this.attendanceRepository.find({
      where: {
        id: {
          inq: attendanceIds,
        },
      },
      include: [
        {
          relation: 'member',
          scope: {
            include: [
              {
                relation: 'subscriptions',
                scope: {
                  where: {
                    status: 'active',
                  },
                  order: ['expiresAt DESC'],
                  limit: 1,
                  include: ['membershipPlan'],
                },
              },
            ],
          },
        },
      ],
      order: ['checkedInAt DESC'],
    })

    return attendances.map((attendance) => {
      const member = attendance.member
      const activeSubscription = member?.subscriptions?.[0] ?? null

      return {
        id: attendance.id!,
        memberId: attendance.memberId,
        memberName: member ? `${member.firstName} ${member.lastName}` : '',
        memberEmail: member?.email ?? '',
        memberSubscriptionId: activeSubscription?.id ?? null,
        planName: activeSubscription?.membershipPlan?.name ?? null,
        checkIn: attendance.checkedInAt,
        checkOut: attendance.checkedOutAt ?? null,
        status: attendance.checkedOutAt ? 'checked-out' : 'checked-in',
      }
    })
  }

  async getStats(date: string): Promise<AttendanceStats> {
    const startDate = new Date(`${date}T00:00:00.000Z`)
    const endDate = new Date(`${date}T23:59:59.999Z`)

    const totalVisits = await this.attendanceRepository.count({
      checkedInAt: {
        between: [startDate, endDate],
      },
    })

    const checkOuts = await this.attendanceRepository.count({
      checkedOutAt: {
        between: [startDate, endDate],
      },
    })

    const currentlyInGym = await this.attendanceRepository.count({
      checkedOutAt: null as unknown as Date,
    })

    return {
      date,
      totalVisits: totalVisits.count,
      currentlyInGym: currentlyInGym.count,
      checkIns: totalVisits.count,
      checkOuts: checkOuts.count,
    }
  }

  create(data: Omit<Attendance, 'id'>): Promise<Attendance> {
    return this.attendanceRepository.create(data)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Attendance>,
  ): Promise<Attendance> {
    try {
      return await this.attendanceRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Attendance ${id} not found`)
    }
  }

  count(where?: Where<Attendance>): Promise<Count> {
    return this.attendanceRepository.count(where)
  }

  async updateById(id: number, data: Partial<Attendance>): Promise<void> {
    await this.findById(id)
    await this.attendanceRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.attendanceRepository.deleteById(id)
  }
}
