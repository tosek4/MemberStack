import {
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  RefreshCw,
  Settings,
  UserRound,
  Users,
} from 'lucide-react'
import { createElement } from 'react'

import { SidebarItem } from '../types'
import { LABELS } from './labels'

export const sidebarItems: SidebarItem[] = [
  {
    label: LABELS.dashboard,
    href: '/dashboard',
    icon: createElement(LayoutDashboard),
    roles: ['reception', 'manager', 'admin', 'superAdmin'],
  },
  {
    label: LABELS.members,
    href: '/members',
    icon: createElement(Users),
    roles: ['reception', 'manager', 'trainer', 'admin', 'superAdmin'],
  },
  {
    label: LABELS.membershipPlans,
    href: '/membershipPlans',
    icon: createElement(ClipboardCheck),
    roles: ['admin', 'superAdmin'],
  },
  {
    label: LABELS.subscriptions,
    href: '/subscriptions',
    icon: createElement(RefreshCw),
    roles: ['reception', 'manager', 'admin', 'superAdmin'],
  },
  {
    label: LABELS.attendance,
    href: '/attendance',
    icon: createElement(UserRound),
    roles: ['reception', 'manager', 'trainer', 'admin', 'superAdmin'],
  },
  {
    label: LABELS.payments,
    href: '/payments',
    icon: createElement(CreditCard),
    roles: ['reception', 'manager', 'admin', 'superAdmin'],
  },
  {
    label: LABELS.users,
    href: '/users',
    icon: createElement(Users),
    roles: ['admin', 'superAdmin'],
  },
  {
    label: LABELS.settings,
    href: '/settings',
    icon: createElement(Settings),
    roles: ['admin', 'superAdmin'],
  },
]
