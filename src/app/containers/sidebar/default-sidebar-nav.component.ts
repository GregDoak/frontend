import {Component} from '@angular/core';
import {navigationItems} from '../../core/navigation/navigation-items';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './default-sidebar-nav.component.html'
})
export class DefaultSidebarNavComponent {

  public navigationItems = navigationItems;

  public isDivider(item): boolean {
    return item.divider;
  }

  public isTitle(item) {
    return item.title;
  }
}
