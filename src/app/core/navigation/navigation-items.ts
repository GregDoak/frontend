import { NavigationItemInterface } from './navigation-item.interface';

export const navigationItems: NavigationItemInterface[] = [
  {
    name: 'Home',
    url: '/',
    icon: 'fa fa-fw fa-home',
    roles: ['ROLE_USER']
  },
  {
    name: 'Admin',
    url: '/admin',
    icon: 'fa fa-fw fa-lock-open',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
    description: 'Access the administrative area.',
    children: [
      {
        name: 'Audit Logs',
        url: '/admin/audit-logs',
        icon: 'fa fa-fw fa-history',
        roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
        description: 'Access the database changes.'
      },
      {
        name: 'Cron Jobs',
        url: '/admin/cron-jobs',
        icon: 'fas fa-fw fa-stopwatch',
        roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
        description: 'View cron jobs and history.',
        children: [
          {
            name: 'Cron Jobs',
            url: '/admin/cron-jobs',
            icon: 'fas fa-fw fa-clock',
            roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
            description: 'View cron jobs and history.'
          },
          {
            name: 'Cron Jobs Tasks',
            url: '/admin/cron-job-tasks',
            icon: 'fas fa-fw fa-tasks',
            roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
            description: 'View cron jobs tasks and history.'
          }
        ]
      },
      {
        name: 'Groups',
        url: '/admin/groups',
        icon: 'fa fa-fw fa-users',
        roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
        description: 'Manage security groups.'
      },
      {
        name: 'Roles',
        url: '/admin/roles',
        icon: 'fa fa-fw fa-lock',
        roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
        description: 'Manage security roles.'
      },
      {
        name: 'Users',
        url: '/admin/users',
        icon: 'fa fa-fw fa-user',
        roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
        description: 'Manage system users.'
      }
    ]
  }
];
