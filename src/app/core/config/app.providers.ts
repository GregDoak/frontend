import { AdminGuard, AuthenticatedGuard } from '../authentication/guards';
import { AuthenticationService } from '../authentication/authentication.service';
import { MenuService } from '../menu/menu.service';
import { AlertService } from '../../utility/alert/alert.service';
import { LoadingService } from '../../utility/loading/loading.service';

export const APP_PROVIDERS = [
  AlertService,
  AdminGuard,
  AuthenticatedGuard,
  AuthenticationService,
  LoadingService,
  MenuService
];
