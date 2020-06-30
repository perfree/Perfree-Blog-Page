import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorConfig} from '../../../../shared/components/editor-markdown/editor-config';
import {EditorMarkdownComponent} from '../../../../shared/components/editor-markdown/editor-markdown.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

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
  @ViewChild('editorMarkdownDom', {static: false}) editorMarkdownDom: EditorMarkdownComponent;
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) {
    this.config = new EditorConfig({height: '400px'});
    this.markdown = '测试内容';
    /*获取markdown编辑器内容
    console.log(this.editorMarkdownDom.getEditorMarkdownComponentValue());
    */
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      categoryName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    });
  }
}
