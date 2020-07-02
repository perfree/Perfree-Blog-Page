import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import {NgZorroAntdModule, NzFormModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CommentListComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class CommentModule { }
