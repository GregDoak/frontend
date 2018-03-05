import { RoleInterface } from '../role/role.interface';

export interface UserInterface {
  id: string,
  username: string,
  lastLogin: string,
  loginCount: number,
  enabled: boolean,
  createdOn: string,
  roles: RoleInterface[]
}
