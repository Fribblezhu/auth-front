import { NgModule } from '@angular/core';
import { CodeCComponent } from './codec.component';
import {RouterModule, Routes} from "@angular/router";
import {NzLayoutModule, NzPaginationModule, NzTableModule} from "ng-zorro-antd";
import {CommonsModule} from "../../common/commons.module";
import { CodecEditComponent } from './codec-edit/codec-edit.component';

const childRoutes: Routes = [
  {
    path: '',
    component: CodeCComponent,
    children: [
      {
        path: 'edit',
        component: CodecEditComponent
      }
    ]
  },
];

@NgModule({
  declarations: [CodeCComponent, CodecEditComponent],
  imports: [
    CommonsModule,
    RouterModule.forChild(childRoutes),
    NzTableModule,
    NzPaginationModule,
    NzLayoutModule,
  ]
})
export class CodecModule { }
