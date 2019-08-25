import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AvatarComponent} from './avatar/avatar.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

/**
 * @author: zhu.wenjian
 * @date: 3/6/19
 * @description:
 */

@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule
  ],
  declarations: [
    AvatarComponent
  ],
  exports: [
    AvatarComponent
  ]
})
export class UserModule {
}
