import {AdminGuard, AuthenticatedGuard} from '../authentication/guards';
import {AuthenticationService} from '../authentication/authentication.service';
import {MenuService} from '../../utilities/menu/menu.service';
import {AlertService} from '../../utilities/alert/alert.service';
import {LoadingService} from '../../utilities/loading/loading.service';

export const APP_PROVIDERS = [
  AlertService,
  AdminGuard,
  AuthenticatedGuard,
  AuthenticationService,
  LoadingService,
  MenuService
];
