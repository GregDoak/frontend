import {Component} from '@angular/core';
import {navigationItems} from '../../core/navigation/navigation-items';
import {NavigationItemInterface} from '../../core/navigation/navigation-item.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public navigationItems: NavigationItemInterface[] = [];

  public constructor(private router: Router, private route: ActivatedRoute) {
    for (const navigationItem of navigationItems) {
      if (this.route.snapshot.data['title'] !== navigationItem.name) {
        this.navigationItems.push(navigationItem);
      }
    }
  }
}
