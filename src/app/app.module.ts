import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NZ_I18N, en_US, NgZorroAntdModule} from 'ng-zorro-antd';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {LoginModule} from './login/login.module';
import {ROUTES} from './app.router';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';
import {CoreModule} from './core/core.module';
import {HeaderModule} from './component/header/header.module';
import {AppConfigService} from './app.config';
import {ShareModule} from './share/share.module';
import {AuthInterceptor} from './core/http-interceptors/auth-interceptor';
import {MenuModule} from './component/menu/menu.module';
import {HeaderLayoutComponent} from './layout/header-layout/header-layout.component';
registerLocaleData(en);

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    HeaderLayoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    HeaderModule,
    MenuModule,
    CoreModule,
    ShareModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AppConfigService,
    httpInterceptorProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
