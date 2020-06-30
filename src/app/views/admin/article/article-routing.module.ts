import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleCreateComponent} from './article-create/article-create.component';


const routes: Routes = [
  {path: 'create', component: ArticleCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
