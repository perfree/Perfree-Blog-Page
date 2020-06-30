import { Component, OnInit } from '@angular/core';
import {EditorConfig} from '../../../../shared/components/editor-markdown/editor-config';
declare var editormd: any;
@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  /**
   * editor的配置参数信息
   */
  config: EditorConfig;
  /**
   * markdown的内容
   */
  markdown: string;
  constructor() {
    this.config = new EditorConfig({height: '400px'});
    this.markdown = '测试内容';
  }

  ngOnInit() {
  }

}
