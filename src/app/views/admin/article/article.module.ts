import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { ArticleCreateComponent } from './article-create/article-create.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [ArticleCreateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ArticleRoutingModule,
    SharedModule,
  ]
})
export class ArticleModule { }
