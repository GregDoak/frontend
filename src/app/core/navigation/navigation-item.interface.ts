export interface NavigationItemInterface {
  name: string;
  url: string;
  description?: string;
  icon: string;
  roles: string[];
  children?: NavigationItemInterface[];
}
