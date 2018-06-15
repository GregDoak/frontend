import { CronJobTaskInterface } from '../cron-job-task/cron-job-task.interface';

export interface CronJobLogInterface {
  id: number;
  cronJobTask: CronJobTaskInterface;
  output: string[];
  exitCode: number;
  startedOn: string;
  endedOn: string;
}
