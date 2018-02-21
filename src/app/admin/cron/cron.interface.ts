export interface CronInterface {
  id: number,
  command: string,
  startDate: string,
  intervalPeriod: number,
  intervalContext: string,
  priority: number,
  nextRun: string,
  lastRun: string,
  createdOn: string,
  active: boolean
}
