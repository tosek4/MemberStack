import {
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
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
  },
  {
    label: LABELS.members,
    href: '/members',
    icon: createElement(Users),
  },
  {
    label: LABELS.subscriptions,
    href: '/subscriptions',
    icon: createElement(ClipboardCheck),
  },
  {
    label: LABELS.attendance,
    href: '/attendance',
    icon: createElement(UserRound),
  },
  {
    label: LABELS.payments,
    href: '/payments',
    icon: createElement(CreditCard),
  },
  {
    label: LABELS.users,
    href: '/users',
    icon: createElement(Users),
  },
  {
    label: LABELS.settings,
    href: '/settings',
    icon: createElement(Settings),
  },
]
