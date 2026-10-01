export interface AIAskRequest {
  question: string
}

export interface AIAskResponse {
  answer: string
}

export interface GetAttendanceSummaryArgs {
  date: string
}

export interface GetExpiringMembershipsArgs {
  daysAhead: number
}
