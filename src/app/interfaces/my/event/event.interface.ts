import {UserInterface} from '../../security/user/user.interface';

export interface EventInterface {
  id?: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  users?: UserInterface[];
}
