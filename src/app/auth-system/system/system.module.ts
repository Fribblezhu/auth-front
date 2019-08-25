import { NgModule } from '@angular/core';
import {SystemComponent} from './system.component';
import {CommonsModule} from "../../common/commons.module";
import {RouterModule, Routes} from "@angular/router";
import {NzLayoutModule, NzPaginationModule, NzTableModule} from "ng-zorro-antd";


const childRoutes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
    ]
  },
];

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonsModule,
    RouterModule.forChild(childRoutes),
    NzTableModule,
    NzPaginationModule,
    NzLayoutModule,
  ]
})
export class SystemModule { }
