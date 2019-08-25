import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RoleComponent} from "./role.component";
import {NzPaginationModule, NzTableModule} from "ng-zorro-antd";
import {RoleService} from "./role.service";
import {CommonsModule} from "../../common/commons.module";

const childRoutes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonsModule,
    NzTableModule,
    NzPaginationModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RoleComponent
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }
