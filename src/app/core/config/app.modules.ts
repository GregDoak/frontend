import { TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

export const APP_MODULES = [
  HttpClientModule,
  TabsModule.forRoot()
];
