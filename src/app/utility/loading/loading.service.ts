import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoadingInterface } from './loading.interface';

@Injectable()
export class LoadingService {
  private counter = 1;

  public loadingStatus: BehaviorSubject<LoadingInterface> = new BehaviorSubject<LoadingInterface>({
    status: false,
    message: null
  });

  private loading = true;

  public clear() {
    this.counter--;
    if (this.counter <= 0) {
      this.show(null);
    }
  }

  public isLoading(): boolean {
    return this.loading;
  }

  public isReady(): boolean {
    return !this.loading;
  }

  public setCounter(counter: number) {
    this.counter = counter;
  }

  public show(message: string) {
    this.loading = (message !== null);
    const loading: LoadingInterface = {
      status: this.loading,
      message: message
    };
    this.loadingStatus.next(loading);
  }

}
