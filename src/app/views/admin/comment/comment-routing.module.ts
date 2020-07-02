import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommentListComponent} from './comment-list/comment-list.component';


const routes: Routes = [
  {path: '', component: CommentListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
