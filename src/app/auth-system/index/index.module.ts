/**
 * @author: zhu.wenjian
 * @date: 5/3/19
 * @description:
 */

import {NgModule} from '@angular/core';
import {CommonsModule} from '../../common/commons.module';
import {IndexComponent} from './index.component';
import {RouterModule, Routes} from '@angular/router';

const childRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [
    CommonsModule,
    RouterModule.forChild(childRoutes)
  ],
  declarations: [
    IndexComponent
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
