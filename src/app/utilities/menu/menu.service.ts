import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationItemInterface} from '../../core/navigation/navigation-item.interface';
import {navigationItems} from '../../core/navigation/navigation-items';

@Injectable()
export class MenuService {
  private readonly navigationItems: NavigationItemInterface[] = [];

  static getNavigationItemChildren(navigationItem: NavigationItemInterface): NavigationItemInterface[] {
    return navigationItem.children ? navigationItem.children : [];
  }

  constructor(private router: Router) {
    let level = 0;
    const routes = this.router.url.split('/');
    if (routes.length > 0) {
      for (const navigationItem of navigationItems) {
        if ('/' + routes[level] === navigationItem.url) {
          this.navigationItems = MenuService.getNavigationItemChildren(navigationItem);
        }
        level++;
      }
    }
  }

  public getNavigationItems(): NavigationItemInterface[] {
    return this.navigationItems;
  }
}
