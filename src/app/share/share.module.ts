/**
 * @author: zhu.wenjian
 * @date: 3/5/19
 * @description:
 */
import {NgModule} from '@angular/core';
import {ToastComponent} from './toast/toast.component';
import {ToastService} from './toast/toast.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicStyleDirective} from '../core/directives/dynamic-style.directive';

// In this module , if did't declarations DynamicStyleModule, will

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ToastComponent,
    DynamicStyleDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,
    DynamicStyleDirective,
  ],
  providers: [
    ToastService
  ]
})
export class ShareModule {
}
