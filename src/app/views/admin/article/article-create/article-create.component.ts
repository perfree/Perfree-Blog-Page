import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorConfig} from '../../../../shared/components/editor-markdown/editor-config';
import {EditorMarkdownComponent} from '../../../../shared/components/editor-markdown/editor-markdown.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {environment} from '../../../../../environments/environment';

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

  loading = false;
  avatarUrl?: string;
  uploadUrl;
  uploadFilePath;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) {
    this.uploadUrl = 'http://' + environment.SERVER_URL + '/upload/img';
    this.config = new EditorConfig({height: '700px'});
    this.markdown = '测试内容';
    /*获取markdown编辑器内容
    console.log(this.editorMarkdownDom.getEditorMarkdownComponentValue());
    */
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      articleTitle: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      categoryId: null,
      tagId: null,
      articleSummary: null,
      keyword: null,
      status: null,
      isEncrypt: null,
      thumbnailType: null,
      isAllowComment: null
    });
  }

  /**
   * 上传改变事件
   * @param info 信息
   */
  handleChange(info): void {
    if (info.file.status === 'done') {
      this.uploadFilePath = info.file.response.url;
      this.avatarUrl = 'http://' + environment.SERVER_URL + info.file.response.url;
      this.msg.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 上传失败`);
    }
  }
}
