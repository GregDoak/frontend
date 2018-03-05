import { Component } from '@angular/core';
import { navigationItems } from '../navigation/navigation-items';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html'
})
export class SidebarNavComponent {

  public navigationItems = navigationItems;

  public isDivider(item): boolean {
    return item.divider;
  }

  public isTitle(item) {
    return item.title;
  }
}
