import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerifyCodeComponent} from './components/verify-code/verify-code.component';
import {HotArticleComponent} from './components/hot-article/hot-article.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {WebsiteInfoComponent} from './components/website-info/website-info.component';
import {TagComponent} from './components/tag/tag.component';
import {EditorMarkdownComponent} from './components/editor-markdown/editor-markdown.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditorMdDirective} from './directive/EditorMdDirective';
import {ImagePanelComponent} from './components/image-panel/image-panel.component';
import { SelectImageComponent } from './components/select-image/select-image.component';


@NgModule({
  declarations: [
    VerifyCodeComponent,
    HotArticleComponent,
    WebsiteInfoComponent,
    TagComponent,
    EditorMarkdownComponent,
    EditorMdDirective,
    ImagePanelComponent,
    SelectImageComponent
  ],
  exports: [
    VerifyCodeComponent,
    HotArticleComponent,
    WebsiteInfoComponent,
    TagComponent,
    EditorMdDirective,
    EditorMarkdownComponent,
    SelectImageComponent,
    ImagePanelComponent
  ],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ImagePanelComponent
  ]
})
export class SharedModule { }
