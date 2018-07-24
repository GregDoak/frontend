import {UserInterface} from '../../security/user/user.interface';

export interface EventInterface {
  id?: string;
  description?: string;
  location?: string;
  startDateTime?: string;
  endDateTime?: string;
  users?: UserInterface[];
  createdBy?: UserInterface;
  createdOn?: string;
  updatedBy?: UserInterface;
  updatedOn?: string;
  active?: boolean;
}
