import { UserInterface } from '../user/user.interface';
import { RoleInterface } from '../role/role.interface';

export interface GroupInterface {
  id?: string;
  title?: string;
  description?: string;
  roles?: RoleInterface[];
  createdBy?: UserInterface;
  createdOn?: string;
  updatedBy?: UserInterface;
  updatedOn?: string;
}
