import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CoreModule } from '../core.module';

export function getToken() {
  return localStorage.getItem('token');
}


export function jwtOptionsFactory() {
  return {
    tokenGetter: getToken,
    whitelistedDomains: ['localhost:8000']
  };
}

export const APP_MODULES = [
  AlertModule.forRoot(),
  CoreModule,
  BsDropdownModule.forRoot(),
  HttpClientModule,
  FormsModule,
  LoadingBarHttpClientModule,
  LoadingBarRouterModule,
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory
    }
  }),
  ReactiveFormsModule,
  TabsModule.forRoot()
];
