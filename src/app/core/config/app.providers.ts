import { AuthenticatedGuard } from '../authentication/guards';
import { AuthenticationService } from '../authentication/authentication.service';

export const APP_PROVIDERS = [
  AuthenticatedGuard,
  AuthenticationService
];
