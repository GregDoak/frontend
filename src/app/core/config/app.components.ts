import { LoginComponent } from '../../login/login.component';
import { AsideComponent } from '../aside/aside.component';
import { AlertComponent } from '../alert/alert.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { P404Component } from '../pages/404.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.components';
import { HomeComponent } from '../../home/home.component';
import { APP_SIDEBAR } from '../sidebar';

export const APP_COMPONENTS = [
  ...APP_SIDEBAR,
  P404Component,
  AlertComponent,
  AsideComponent,
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent
];
