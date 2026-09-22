import { BindingKey } from '@loopback/core'
import { DashboardService } from "./services/dashboard.service";

export const DASHBOARD_SERVICE =
  BindingKey.create<DashboardService>('service.dashboard')
