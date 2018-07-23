import {APP_SIDEBAR} from '../../containers/sidebar';
import {AlertComponent} from '../../utilities/alert/alert.component';
import {AuthenticatedHeaderComponent} from '../../containers/header/authenticated-header.component';
import {AuthenticatedMainComponent} from '../../containers/main/authenticated-main.component';
import {BreadcrumbsComponent} from '../../containers/breadcrumbs/breadcrumbs.components';
import {DefaultAsideComponent} from '../../containers/aside/default-aside.component';
import {DefaultFooterComponent} from '../../containers/footer/default-footer.component';
import {DefaultHeaderComponent} from '../../containers/header/default-header.component';
import {DefaultMainComponent} from '../../containers/main/default-main.component';
import {HomeComponent} from '../../pages/home/home.component';
import {LoadingComponent} from '../../utilities/loading/loading.component';
import {LoginComponent} from '../../pages/login/login.component';
import {MyComponent} from '../../pages/my/my.component';
import {EventTabComponent} from '../../utilities/event-tab/event-tab.component';

export const APP_COMPONENTS = [
  ...APP_SIDEBAR,
  AlertComponent,
  AuthenticatedHeaderComponent,
  AuthenticatedMainComponent,
  BreadcrumbsComponent,
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultMainComponent,
  EventTabComponent,
  HomeComponent,
  LoadingComponent,
  LoginComponent,
  MyComponent
];
