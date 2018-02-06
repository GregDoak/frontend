import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule } from 'ngx-bootstrap';

export const APP_MODULES = [
  AlertModule.forRoot(),
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  TabsModule.forRoot()
];


