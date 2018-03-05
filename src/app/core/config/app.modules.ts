import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule } from 'ngx-bootstrap';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { CoreModule } from '../core.module';

export function getToken() {
  return localStorage.getItem('token');
}


export function jwtOptionsFactory() {
  return {
    tokenGetter: getToken,
    whitelistedDomains: [process.env.API_HOST]
  }
}

export const APP_MODULES = [
  AlertModule.forRoot(),
  CoreModule,
  HttpClientModule,
  FormsModule,
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory
    }
  }),
  ReactiveFormsModule,
  TabsModule.forRoot()
];
