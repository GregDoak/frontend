import { UserInterface } from '../user/user.interface';

export interface GroupInterface {
  id?: string,
  title?: string,
  description?: string,
  createdBy?: UserInterface,
  createdOn?: string,
  updatedBy?: UserInterface,
  updatedOn?: string
}
