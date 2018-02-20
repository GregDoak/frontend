import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule } from 'ngx-bootstrap';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem('token');
}

const jwtConfig: JwtModuleOptions = {
  config: {
    skipWhenExpired: true,
    tokenGetter: getToken,
    whitelistedDomains: [process.env.API_HOST]
  }
};

export const APP_MODULES = [
  AlertModule.forRoot(),
  HttpClientModule,
  FormsModule,
  JwtModule.forRoot(jwtConfig),
  ReactiveFormsModule,
  TabsModule.forRoot()
];
