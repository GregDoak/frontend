import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoadingInterface } from './loading.interface';

@Injectable()
export class LoadingService {

  public loadingStatus: BehaviorSubject<LoadingInterface> = new BehaviorSubject<LoadingInterface>({
    status: false,
    message: null
  });

  private loading = true;

  public clearLoading() {
    this.showLoading(null);
  }

  public isLoading() {
    return this.loading;
  }

  public showLoading(message: string) {
    this.loading = (message !== null);
    let loading: LoadingInterface = {
      status: this.loading,
      message: message
    };
    this.loadingStatus.next(loading);
  }

}
