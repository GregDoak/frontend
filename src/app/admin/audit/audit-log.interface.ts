import { UserInterface } from '../../entity/security/user/user.interface';

export interface AuditLogInterface {
  id?: number;
  action?: string;
  table?: string;
  source?: {
    interface: string,
    class: string,
    entity: object
  };
  target?: {
    interface: string,
    class: string,
    entity: object
  };
  updatedBy?: {
    interface: string,
    class: string,
    entity: UserInterface
  };
  changes?: number;
  updatedOn?: string;
}
