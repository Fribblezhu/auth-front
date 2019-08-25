import {NgModule} from '@angular/core';
import {MineComponent} from './mine.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule
  ],
  declarations: [
    MineComponent
  ],
  exports: [
    MineComponent
  ]
})
export class MineModule {
}
