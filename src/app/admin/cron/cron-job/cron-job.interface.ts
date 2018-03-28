import { CronJobLogInterface } from './cron-job-log.interface';
import { CronJobTaskInterface } from '../cron-job-task/cron-job-task.interface';

export interface CronJobInterface {
  id: number,
  hostname?: string,
  pid?: number,
  startDate?: string,
  endDate?: string,
  tasks?: CronJobTaskInterface[]
  jobs?: CronJobLogInterface[]
}
