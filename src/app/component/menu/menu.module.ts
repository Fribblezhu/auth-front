import {NgZorroAntdModule, NzIconModule} from 'ng-zorro-antd';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {MenuService} from "./menu.service";


@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule,
    RouterModule,
    NzIconModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule {

}
