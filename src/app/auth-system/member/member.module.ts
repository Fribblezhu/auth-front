/**
 * @author: zhu.wenjian
 * @date: 5/3/19
 * @description:
 */

import {NgModule} from '@angular/core';
import {MemberComponent} from './member.component';
import {CommonsModule} from '../../common/commons.module';
import {RouterModule, Routes} from '@angular/router';
import {
  NzAvatarModule, NzPaginationModule, NzTableModule, NzModalModule, NzFormModule, NzDatePickerModule
} from 'ng-zorro-antd';
import {MemberService} from './member.service';
import { MemberEditComponent } from './edit/member-edit.component';


const childRoutes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: 'edit',
        component: MemberEditComponent
      }
    ]
  }
];

@NgModule ({
  imports: [
    CommonsModule,
    NzTableModule,
    NzPaginationModule,
    NzAvatarModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    RouterModule.forChild(childRoutes)
  ],
  declarations: [
    MemberComponent,
    MemberEditComponent,
  ],
  exports: [
    MemberComponent,
    MemberEditComponent
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
