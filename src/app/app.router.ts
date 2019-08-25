import {Routes} from '@angular/router';
import {SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';
import {LoginComponent} from './login/login.component';
import {CommonGuard} from './core/guard/common.guard';
import {HeaderLayoutComponent} from './layout/header-layout/header-layout.component';

export const ROUTES: Routes = [
  {
    path: 'authSystem',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [CommonGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [CommonGuard]
      }
    ]
  },
  {
    path: 'authSystem',
    component: HeaderLayoutComponent,
    children: [
      {
        path: 'index',
        // 使用loadChildren时,不需要在app module 中 import !!!
        loadChildren: './auth-system/index/index.module#IndexModule'
      },
      {
        path: 'member',
        loadChildren: './auth-system/member/member.module#MemberModule'
      },
      {
        path: 'role',
        loadChildren: './auth-system/role/role.module#RoleModule'
      },
      {
        path: 'organize',
        loadChildren: './auth-system/organize/organize.module#OrganizeModule'
      },
      {
        path: 'code',
        loadChildren: './auth-system/code/code.module#CodeModule'
      },
      {
        path: 'codec',
        loadChildren: './auth-system/codec/codec.module#CodecModule'
      },
      {
        path: 'system',
        loadChildren: './auth-system/system/system.module#SystemModule'
      }
    ]
  },
];
