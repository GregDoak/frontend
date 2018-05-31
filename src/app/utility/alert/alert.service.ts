import { Injectable } from '@angular/core';
import { Alert } from './alert.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class AlertService {

  public alertStatus: BehaviorSubject<Alert> = new BehaviorSubject<Alert>({
    type: null,
    message: null,
    messages: []
  });

  private static isValidType(type: string) {
    switch (type.toLowerCase()) {
      case 'suc':
      case 'success':
      case 'pass':
        return true;
      case 'info':
      case 'information':
        return true;
      case 'warn':
      case 'warning':
        return true;
      case 'danger':
      case 'error':
        return true;
      default:
        return false;

    }
  }

  private static formatMessage(error: any): string {
    let message: string;

    if (error.message) {
      message = error.message;
    } else if (error.error && error.error.message) {
      message = 'Sorry, something has broken our server!';
    } else {
      message = 'Sorry, something has gone very wrong... ';
    }

    return message;
  }

  private static filterAlert(alert: any): Alert {
    return {
      type: (alert.type && AlertService.isValidType(alert.type)) ? alert.type : 'danger',
      message: (alert.message) ? alert.message : alert.statusText,
      messages: (alert.messages) ? alert.messages : []
    };
  }

  public clear(delay = 0) {
    let type = this.alertStatus.getValue().type;
    delay = (type === 'danger') ? 0 : delay;
    setTimeout(() => {
      this.show(null, null, null);
    }, delay);
  }

  public handleError(error: any) {
    if (error.error) {
      error = error.error.data;
    }
    let type = 'danger';
    let message = AlertService.formatMessage(error);
    let messages = error.messages ? error.messages : [];
    this.show(type, message, messages);
  }

  public handleSuccess(success: any) {
    if (success.data) {
      success = success.data;
    }
    let type = success.type;
    let message = AlertService.formatMessage(success);
    let messages = success.messages ? success.messages : [];
    this.show(type, message, messages);
  }

  public show(type: string, message: string, messages: string[] = []) {
    let alert: Alert = {
      type: <string> type,
      message: <string> message,
      messages: <string[]> messages
    };
    if (type !== null) {
      alert = AlertService.filterAlert(alert);
    }
    this.alertStatus.next(alert);
  }


}
