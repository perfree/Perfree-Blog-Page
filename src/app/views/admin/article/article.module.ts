import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ArticleCreateComponent } from './article-create/article-create.component';
import {SharedModule} from '../../../shared/shared.module';
import { ArticleCreateSuccessComponent } from './article-create-success/article-create-success.component';
import { ArticleListComponent } from './article-list/article-list.component';


@NgModule({
  declarations: [ArticleCreateComponent, ArticleCreateSuccessComponent, ArticleListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ArticleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ArticleModule { }
