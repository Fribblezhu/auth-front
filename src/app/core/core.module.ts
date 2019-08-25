import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonGuard} from './guard/common.guard';
import {Error} from 'tslint/lib/error';
import {AuthService} from './auth/auth.service';
import {HttpErrorHandler} from './handler/http-error-handler';
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import {DynamicStyleDirective} from './directives/dynamic-style.directive';
import {MemberGuard} from './guard/member.guard';

/**
 *  ＠author zhu.wenjian
 *
 */

@NgModule({
  providers: [
    CommonGuard,
    MemberGuard,
    AuthService,
    HttpErrorHandler,
    AuthInterceptor,
    DynamicStyleDirective
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
