import { NgModule } from '@angular/core';
import { OrganizeComponent } from './organize.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonsModule} from "../../common/commons.module";



const childRoutes: Routes = [
  {
    path: '',
    component: OrganizeComponent,
  }
];

@NgModule({
  declarations: [
    OrganizeComponent
  ],
  imports: [
    CommonsModule,
    RouterModule.forChild(childRoutes)
  ]
})
export class OrganizeModule { }
