import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {CommonsModule} from '../common/commons.module';

@NgModule({
  imports: [
    CommonsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
