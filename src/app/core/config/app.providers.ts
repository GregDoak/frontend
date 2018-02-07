import { AdminGuard, AuthenticatedGuard } from '../authentication/guards';
import { AuthenticationService } from '../authentication/authentication.service';
import { AlertService } from '../alert/alert.service';

export const APP_PROVIDERS = [
  AlertService,
  AdminGuard,
  AuthenticatedGuard,
  AuthenticationService
];
