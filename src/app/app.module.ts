import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { EagerComponent } from './eager.component';

const routes: Routes = [
  {path: '', redirectTo: 'eager', pathMatch: 'full'},
  {path: 'eager', component: EagerComponent},
  {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    EagerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
