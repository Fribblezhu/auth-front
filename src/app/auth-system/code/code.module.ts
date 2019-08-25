import { NgModule } from '@angular/core';
import { CodeComponent } from './code.component';
import {RouterModule, Routes} from "@angular/router";
import {NzLayoutModule, NzPaginationModule, NzTableModule} from "ng-zorro-antd";
import {CommonsModule} from "../../common/commons.module";
import {CodeEditComponent} from "./code-edit/code-edit.component";
import { CodeClassifyComponent } from './code-classify/code-classify.component';


const childRoutes: Routes = [
  {
    path: '',
    component: CodeComponent,
    children: [
      {
        path: 'edit',
        component: CodeEditComponent
      },
      {
        path: 'classify',
        component: CodeClassifyComponent
      }
    ]
  },
];

@NgModule({
  declarations: [CodeComponent, CodeEditComponent, CodeClassifyComponent],
  imports: [
    CommonsModule,
    RouterModule.forChild(childRoutes),
    NzTableModule,
    NzPaginationModule,
    NzLayoutModule,
  ]
})
export class CodeModule { }
