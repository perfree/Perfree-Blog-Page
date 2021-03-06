import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './core/canActivate/loginGuard';
import {LayoutAdminDefaultResolver} from './layout/admin/layout-admin-default.resolver';
import {LayoutAdminDefaultComponent} from './layout/admin/layout-admin-default/layout-admin-default.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    resolve: {
      data: LayoutAdminDefaultResolver
    },
    component: LayoutAdminDefaultComponent,
    children: [
      {path: 'console', loadChildren: './views/admin/console/console.module#ConsoleModule'},
      {path: 'menus', loadChildren: './views/admin/menus/menus.module#MenusModule'},
      {path: 'user', loadChildren: './views/admin/user/user.module#UserModule'},
      {path: 'category', loadChildren: './views/admin/category/category.module#CategoryModule'},
      {path: 'article', loadChildren: './views/admin/article/article.module#ArticleModule'},
      {path: 'tag', loadChildren: './views/admin/tag/tag.module#TagModule'},
      {path: 'comment', loadChildren: './views/admin/comment/comment.module#CommentModule'},
      {path: 'option', loadChildren: './views/admin/option/option.module#OptionModule'},
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
