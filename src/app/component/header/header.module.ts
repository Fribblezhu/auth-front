import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {MineModule} from '../mine/mine.module';
import {AvatarComponent} from '../../user/avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [
    HeaderComponent,
    AvatarComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
