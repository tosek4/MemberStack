export const tools = [
  {
    type: 'function',
    name: 'get_attendance_summary',
    description:
      'Get the gym attendance statistics for one specific date. Use this when the user asks how many visits, check-ins, check-outs, or currently present members there were on a date.',
    parameters: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: 'Date in YYYY-MM-DD format.',
        },
      },
      required: ['date'],
      additionalProperties: false,
    },
    strict: true,
  },
  {
    type: 'function',
    name: 'get_expiring_memberships',
    description:
      'Count active memberships that expire between now and a specified number of days from now. Use this for questions about memberships or subscriptions that are expiring soon.',
    parameters: {
      type: 'object',
      properties: {
        daysAhead: {
          type: 'integer',
          description: 'Number of days ahead to check, from 1 to 365.',
        },
      },
      required: ['daysAhead'],
      additionalProperties: false,
    },
    strict: true,
  },
] as const
