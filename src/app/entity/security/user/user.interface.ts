import { RoleInterface } from '../role/role.interface';
import { GroupInterface } from '../group/group.interface';

export interface UserInterface {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  lastLogin?: string;
  loginCount?: number;
  enabled?: boolean;
  createdOn?: string;
  groups?: GroupInterface[];
  roles?: RoleInterface[];
}
