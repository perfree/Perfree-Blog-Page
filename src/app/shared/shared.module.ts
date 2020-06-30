import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { HotArticleComponent } from './components/hot-article/hot-article.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { WebsiteInfoComponent } from './components/website-info/website-info.component';
import { TagComponent } from './components/tag/tag.component';
import { EditorMarkdownComponent } from './components/editor-markdown/editor-markdown.component';
import {AppModule} from '../app.module';
import {ReactiveFormsModule} from '@angular/forms';
import {EditorMdDirective} from './directive/EditorMdDirective';



@NgModule({
  declarations: [VerifyCodeComponent, HotArticleComponent, WebsiteInfoComponent, TagComponent, EditorMarkdownComponent, EditorMdDirective],
  exports: [
    VerifyCodeComponent,
    HotArticleComponent,
    WebsiteInfoComponent,
    TagComponent,
    EditorMdDirective,
    EditorMarkdownComponent
  ],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
