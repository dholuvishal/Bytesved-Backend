export const ASSETSTATUS = {
  PENDING:'Pending',
  APPROVED:'Approved',
  DEPLOYED: 'Deployed',
  DAMAGED: 'Damaged',
  RETURNED: 'Returned'
} as const;

export type AssetStatus = typeof ASSETSTATUS[keyof typeof ASSETSTATUS];

export const PRIORITY = {
  HIGH:'High',
  MEDIUM:'Medium',
  LOW: 'Low'
} as const;

export type priority = typeof PRIORITY[keyof typeof PRIORITY];


export const STATUS = {
  ACTIVE:'Active',
  INACTIVE:'Inactive',
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];

export const CHARGETYPE = {
  HOURLY:'Hourly',
  FIXED:'Fixed'
} as const;

export type ChargeType = typeof CHARGETYPE[keyof typeof CHARGETYPE];

export const JOBPERIODS = {
  NOTICE:'NoticePeriod',
  PROBATION:'ProbationPeriod',
} as const;

export type JobPeriods = typeof JOBPERIODS[keyof typeof JOBPERIODS];

export const LEAVESTATUS = {
  APPROVED: 'Approved',
  DECLINED: 'Declined',
  PENDING: 'Pending',
} as const;

export type LeaveStatus = typeof LEAVESTATUS[keyof typeof LEAVESTATUS];


export const ATTENDANCE = {
  TRUE: 'True',
  FALSE: 'False',
} as const;

export type AttendanceStatus = typeof ATTENDANCE[keyof typeof ATTENDANCE];


export const ROLES = {
    ADMIN: 'Admin',
    HR: 'HR',
    EMPLOYEE: 'Employee',
    TEAM_LEADER: 'TeamLeader'
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

export const JWT_EXPIRATION = '12h';

export const MODULES = {
  HOLIDAYS: 'Holidays',
  LEAVES: 'Leaves',
  CLIENTS: 'Clients',
  PROJECTS: 'Projects',
  TASKS: 'Tasks',
  CHATS: 'Chats',
  ASSETS: 'Assets',
  TIMING_SHEETS: 'Timing Sheets'
} as const;

export type ModuleNameType = typeof MODULES[keyof typeof MODULES];
