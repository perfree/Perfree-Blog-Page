import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { HotArticleComponent } from './components/hot-article/hot-article.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { WebsiteInfoComponent } from './components/website-info/website-info.component';
import { TagComponent } from './components/tag/tag.component';



@NgModule({
  declarations: [VerifyCodeComponent, HotArticleComponent, WebsiteInfoComponent, TagComponent],
  exports: [
    VerifyCodeComponent,
    HotArticleComponent,
    WebsiteInfoComponent,
    TagComponent
  ],
  imports: [
    NgZorroAntdModule,
    CommonModule
  ]
})
export class SharedModule { }
