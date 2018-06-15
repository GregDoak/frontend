import {LoginComponent} from '../../login/login.component';
import {AsideComponent} from '../aside/aside.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
import {P404Component} from '../pages/404.component';
import {BreadcrumbsComponent} from '../breadcrumbs/breadcrumbs.components';
import {HomeComponent} from '../../home/home.component';
import {APP_SIDEBAR} from '../sidebar';
import {AlertComponent} from '../../utility/alert/alert.component';
import {LoadingComponent} from '../../utility/loading/loading.component';
import {MyComponent} from '../../my/my.component';

export const APP_COMPONENTS = [
  ...APP_SIDEBAR,
  P404Component,
  AlertComponent,
  AsideComponent,
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoadingComponent,
  LoginComponent,
  MyComponent
];
