export interface AuditInterface {
  id: number,
  action: string,
  table: string,
  source: {
    interface: string,
    class: string,
    entity: object
  },
  updatedBy: {
    interface: string,
    class: string,
    entity: object
  },
  changes: string[],
  updatedOn: string
}
