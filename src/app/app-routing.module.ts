import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from './core/canActivate/loginGuard';
import {LayoutAdminDefaultResolver} from './layout/admin/layout-admin-default.resolver';
import {LayoutAdminDefaultComponent} from './layout/admin/layout-admin-default/layout-admin-default.component';
import {LayoutPortalDefaultComponent} from './layout/portal/layout-portal-default/layout-portal-default.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LayoutPortalDefaultComponent,
    children: [
      /* {path: 'admin/user', loadChildren: './views/user/user.module#UserModule'}*/
    ]
  },
  {
    path: 'admin',
    canActivate: [LoginGuard],
    resolve: {
      data: LayoutAdminDefaultResolver
    },
    component: LayoutAdminDefaultComponent,
    children: [
      {path: 'console', loadChildren: './views/admin/console/console.module#ConsoleModule'},
      /* {path: 'admin/user', loadChildren: './views/user/user.module#UserModule'}*/
    ]
  },
  {path: 'passport', loadChildren: './views/public/passport/passport.module#PassportModule'},
  {path: '**', loadChildren: './views/exception/exception.module#ExceptionModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
