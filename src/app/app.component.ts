import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public title = `app works! - Environment : ${process.env.ENV}`;

  ngOnInit() {
    console.log('on init');
  }
}
