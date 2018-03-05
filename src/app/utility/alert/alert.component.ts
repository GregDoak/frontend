import { Component, OnInit } from '@angular/core';
import { Alert } from './alert.interface';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
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
