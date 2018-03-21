import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemInterface } from '../navigation/navigation-item.interface';
import { navigationItems } from '../navigation/navigation-items';

@Injectable()
export class MenuService {
  private navigationItems: NavigationItemInterface[] = [];

  constructor(private router: Router) {
    let level = 0;
    let routes = this.router.url.split('/');
    console.log(level, routes);
    if (routes.length > 0) {
      for (let navigationItem of navigationItems) {
        if ('/' + routes[level] === navigationItem.url) {
          this.navigationItems = MenuService.getNavigationItemChildren(navigationItem)
        }
        level++;
      }
    }
  }

  static getNavigationItemChildren(navigationItem: NavigationItemInterface): NavigationItemInterface[] {
    return navigationItem.children ? navigationItem.children : [];
  }

  public getNavigationItems(): NavigationItemInterface[] {
    return this.navigationItems;
  }
}
