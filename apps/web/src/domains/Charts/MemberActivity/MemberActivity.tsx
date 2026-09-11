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
}) => {
  return (
    <div className={styles.card.root}>
      <h2 className={styles.card.title}>
        {LABELS.title}
      </h2>

      <div className={styles.card.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="newMembers"
              name={LABELS.newMembers}
              stroke="#3b82f6"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="activeMembers"
              name={LABELS.activeMembers}
              stroke="#22c55e"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="expiredMembers"
              name={LABELS.expiredMembers}
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}