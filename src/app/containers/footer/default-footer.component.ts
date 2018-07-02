import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './default-footer.component.html'
})
export class DefaultFooterComponent {
  public today: Date;

  constructor() {
    this.today = new Date();
  }
}
