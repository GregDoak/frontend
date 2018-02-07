import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav-dropdown',
  templateUrl: './sidebar-nav-dropdown.component.html'
})
export class SidebarNavDropdownComponent {
  @Input() link: any;

  public isBadge(): boolean {
    return this.link.badge;
  }

  public isIcon(): boolean {
    return this.link.icon;
  }
}
