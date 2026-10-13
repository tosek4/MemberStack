import { injectable } from '@loopback/core'
import { repository } from '@loopback/repository'

import { AttendanceRepository } from '../repositories'

@injectable()
export class AttendanceAutoCheckoutService {
  constructor(
    @repository(AttendanceRepository)
    private readonly attendanceRepository: AttendanceRepository,
  ) {}

  async checkOutOpenAttendances(): Promise<number> {
    const openAttendances = await this.attendanceRepository.find({
      where: { checkedOutAt: null as unknown as Date },
    })

    if (openAttendances.length === 0) {
      console.log('[AttendanceAutoCheckoutService] No open attendances.')

      return 0
    }

    for (const attendance of openAttendances) {
      const checkedInAt = new Date(attendance.checkedInAt)

      const endOfCheckInDay = new Date(checkedInAt)
      endOfCheckInDay.setHours(23, 59, 59, 999)

      await this.attendanceRepository.updateById(attendance.id, {
        checkedOutAt: endOfCheckInDay,
        status: 'checked-out',
      })
    }

    console.log(
      `[AttendanceAutoCheckoutService] Checked out ${openAttendances.length} attendance(s).`,
    )

    return openAttendances.length
  }
}
