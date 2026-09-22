'use client'

import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { styles } from './MemberActivity.styled'
import { MemberActivityProps } from './types'
import { LABELS } from './utils/labels'

export const MemberActivity: React.FC<MemberActivityProps> = ({
  data,
  period,
  onPeriodChange,
}) => {
  
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{LABELS.title}</h2>

          <p className={styles.subtitle}>Member activity over time</p>
        </div>

        <div className={styles.periods}>
          <button
            type="button"
            className={`${styles.period} ${
              period === '7d' ? styles.periodActive : ''
            }`}
            onClick={() => onPeriodChange('7d')}
          >
            7D
          </button>

          <button
            type="button"
            className={`${styles.period} ${
              period === '30d' ? styles.periodActive : ''
            }`}
            onClick={() => onPeriodChange('30d')}
          >
            30D
          </button>

          <button
            type="button"
            className={`${styles.period} ${
              period === '3m' ? styles.periodActive : ''
            }`}
            onClick={() => onPeriodChange('3m')}
          >
            3M
          </button>

          <button
            type="button"
            className={`${styles.period} ${
              period === '1y' ? styles.periodActive : ''
            }`}
            onClick={() => onPeriodChange('1y')}
          >
            1Y
          </button>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="newMembers"
              name={LABELS.newMembers}
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="activeMembers"
              name={LABELS.activeMembers}
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="expiredMembers"
              name={LABELS.expiredMembers}
              stroke="#f43f5e"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
