import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleCreateComponent} from './article-create/article-create.component';
import {ArticleCreateSuccessComponent} from './article-create-success/article-create-success.component';
import {ArticleListComponent} from './article-list/article-list.component';


const routes: Routes = [
  {path: 'create', component: ArticleCreateComponent},
  {path: 'create/success', component: ArticleCreateSuccessComponent},
  {path: 'list', component: ArticleListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
