import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-nav-link',
  templateUrl: './default-sidebar-nav-link.component.html'
})
export class DefaultSidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant(): boolean {
    return this.link.variant;
  }

  public hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show');
    }
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
}
