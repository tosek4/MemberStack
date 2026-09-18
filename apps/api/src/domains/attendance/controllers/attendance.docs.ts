import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { Attendance } from '../models'
import { CountSchema } from '@loopback/repository'

export const AttendanceResponseSchema = {
  responses: {
    '200': {
      description: 'Array of Attendance model instances',
      content: {
        'application/json': {
          schema: { type: 'array', items: getModelSchemaRef(Attendance) },
        },
      },
    },
  },
}

export const AttendanceCountResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance model count',
      content: { 'application/json': { schema: CountSchema } },
    },
  },
}

export const AttendanceGetByIdResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Attendance) },
      },
    },
  },
}

export const AttendanceUpdateResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance PATCH success',
    },
  },
}

export const CreateAttendanceResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Attendance) },
      },
    },
  },
}

const createAttendanceSchema: SchemaObject = {
  type: 'object',
  required: ['checkedInAt', 'memberId', 'attendanceMethod'],
  properties: {
    checkedInAt: { type: 'string' },
    attendanceMethod: { type: 'string', enum: ['qr', 'nfc', 'manual'] },
    memberId: { type: 'number' },
  },
}

export const CreateAttendanceRequestSchema = {
  description: 'Required input for creating an attendance record',
  content: {
    'application/json': {
      schema: createAttendanceSchema,
    },
  },
  required: true,
}

export const UpdateAttendanceRequestSchema = {
  description: 'Required input for updating an attendance record',
  content: {
    'application/json': {
      schema: getModelSchemaRef(Attendance, { partial: true }),
    },
  },
  required: true,
}
export const AttendanceDeleteResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance DELETE success',
    },
  },
}
export const AttendanceStatsResponseSchema = {
  responses: {
    '200': {
      description: 'Attendance statistics',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
              },
              totalVisits: {
                type: 'number',
              },
              currentlyInGym: {
                type: 'number',
              },
              checkIns: {
                type: 'number',
              },
              checkOuts: {
                type: 'number',
              },
            },
          },
        },
      },
    },
  },
}
