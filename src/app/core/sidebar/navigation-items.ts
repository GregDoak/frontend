export const navigationItems = [
  {
    name: 'Home',
    url: '/',
    icon: 'fa fa-fw fa-home',
  },
  {
    name: 'Admin',
    url: '/admin',
    icon: 'fa fa-fw fa-home',
    children: [
      {
        name: 'Audit Logs',
        url: '/admin/audit-logs',
        icon: 'fa fa-fw fa-home',
      },
      {
        name: 'Cron Jobs',
        url: '/admin/cron-jobs',
        icon: 'fa fa-fw fa-home',
      },
      {
        name: 'Groups',
        url: '/admin/groups',
        icon: 'fa fa-fw fa-home',
      },
      {
        name: 'Roles',
        url: '/admin/roles',
        icon: 'fa fa-fw fa-home',
      },
      {
        name: 'Users',
        url: '/admin/users',
        icon: 'fa fa-fw fa-home',
      }
    ]
  },
  {
    divider: true
  }
];
