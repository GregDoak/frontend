import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav-link',
  templateUrl: './sidebar-nav-link.component.html'
})
export class SidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant(): boolean {
    return this.link.variant;
  }

  public isBadge(): boolean {
    return this.link.badge;
  }

  public isExternalLink(): boolean {
    return this.link.url.substring(0, 4) === 'http';
  }

  public isIcon(): boolean {
    return this.link.icon;
  }

  public hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
