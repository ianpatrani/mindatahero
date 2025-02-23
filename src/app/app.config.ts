import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InterceptorLoading } from './interceptors/interceptor-loading.interceptor';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes',
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./pages/heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: '**',
    redirectTo: 'heroes',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorLoading, multi: true},
  ],
};
