import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Alert } from './alert.interface';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'alert.component.html',
  providers: []
})
export class AlertComponent implements OnInit {

  public alert: Alert;

  constructor(private alertService: AlertService) {
  }

  public ngOnInit() {
    this.alertService.alertStatus.subscribe((alert: Alert) => {
      this.alert = alert;
    });

  }

  public closeAlert() {
    this.alertService.showAlert(null, null, null);
  }

}
