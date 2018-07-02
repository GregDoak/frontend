import {Component, Input} from '@angular/core';
import {NavigationItemInterface} from '../../core/navigation/navigation-item.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: 'menu-item.component.html',
  styleUrls: ['menu-item.component.css']
})
export class MenuItemComponent {
  @Input() navigationItem: NavigationItemInterface;
}
