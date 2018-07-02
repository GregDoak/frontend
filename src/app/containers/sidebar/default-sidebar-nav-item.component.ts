import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-nav-item',
  templateUrl: './default-sidebar-nav-item.component.html'
})
export class DefaultSidebarNavItemComponent {
  @Input() item: any;

  constructor(private router: Router) {
  }

  public hasClass(): boolean {
    return this.item.class;
  }

  public isDropdown(): boolean {
    return this.item.children;
  }

  public thisUrl(): string {
    return this.item.url;
  }

  public isActive(): boolean {
    return this.router.isActive(this.thisUrl(), false);
  }

}
