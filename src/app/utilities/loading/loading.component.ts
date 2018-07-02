import {Component, OnInit} from '@angular/core';
import {LoadingInterface} from './loading.interface';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: 'loading.component.html'
})
export class LoadingComponent implements OnInit {
  public loading: LoadingInterface;

  constructor(private loadingService: LoadingService) {
  }

  public ngOnInit() {
    this.loadingService.loadingStatus.subscribe((loading: LoadingInterface) => {
      this.loading = loading;
    });

  }
}
