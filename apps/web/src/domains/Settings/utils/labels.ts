export const LABELS = {
  title: 'Settings',

  subtitle: 'Manage your gym configuration and account settings.',

  general: {
    title: 'General',
    description: 'Basic information about your gym.',

    gymName: 'Gym name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    currency: 'Currency',
  },

  membership: {
    title: 'Membership',
    description: 'Configure default membership behavior.',

    defaultDuration: 'Default membership duration',
    defaultDurationHelp: 'Duration used when creating a new subscription.',

    expiringSoonDays: 'Expiring soon threshold',
    expiringSoonDaysHelp:
      'Show memberships as expiring soon when they have this many days remaining.',

    gracePeriodDays: 'Grace period',
    gracePeriodDaysHelp:
      'Number of days a member can continue after their membership expires.',
  },

  security: {
    title: 'Security',
    description: 'Manage account and session security.',

    sessionTimeout: 'Session timeout',
    sessionTimeoutHelp:
      'Automatically sign out users after this period of inactivity.',

    changePassword: 'Change password',
    changePasswordDescription: 'Update your current account password.',
    changePasswordButton: 'Change password',
  },

  actions: {
    save: 'Save changes',
    saving: 'Saving...',
    cancel: 'Cancel',
  },

  currency: {
    eur: 'Euro (€)',
    usd: 'US Dollar ($)',
    gbp: 'British Pound (£)',
    mkd: 'Macedonian Denar (ден)',
  },

  duration: {
    month: 'Month',
    months: 'Months',
  },

  session: {
    minutes15: '15 minutes',
    minutes30: '30 minutes',
    hour1: '1 hour',
    hours2: '2 hours',
    hours4: '4 hours',
  },
} as const
