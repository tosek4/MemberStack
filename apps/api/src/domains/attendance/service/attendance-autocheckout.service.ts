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
    const now = new Date()

    const openAttendances = await this.attendanceRepository.find({
      where: { checkedOutAt: null as unknown as Date },
    })

    if (openAttendances.length === 0) {
      console.log('[AttendanceAutoCheckoutService] No open attendances.')

      return 0
    }

    for (const attendance of openAttendances) {
      const checkedInDay = new Date(attendance.checkedInAt)
        .toISOString()
        .slice(0, 10)
      const endOfCheckInDay = new Date(`${checkedInDay}T23:59:59.999Z`)

      await this.attendanceRepository.updateById(attendance.id, {
        checkedOutAt: now < endOfCheckInDay ? now : endOfCheckInDay,
        status: 'checked-out',
      })
    }

    console.log(
      `[AttendanceAutoCheckoutService] Checked out ${openAttendances.length} attendance(s).`,
    )

    return openAttendances.length
  }
}
