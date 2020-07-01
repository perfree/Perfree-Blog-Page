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
  thumbnailUrl?: string;
  uploadUrl;
  uploadFilePath;

  categoryList = [];
  tagList = [];
  isShowPassword = false;
  isShowUploadThumbnail = false;
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
      status: [0],
      isEncrypt: [0],
      password: [null],
      thumbnailType: [0],
      isAllowComment: [0]
    });
    this.initCategory();
    this.initTag();
  }

  /**
   * 上传改变事件
   * @param info 信息
   */
  handleChange(info): void {
    if (info.file.status === 'done') {
      this.uploadFilePath = info.file.response.url;
      this.thumbnailUrl = 'http://' + environment.SERVER_URL + info.file.response.url;
      this.msg.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 上传失败`);
    }
  }

  /**
   * 加载分类
   */
  initCategory() {
    this.httpUtil.get('/category/all').then(res => {
      this.categoryList = res.data;
    });
  }

  /**
   * 初始化标签
   */
  initTag() {
    this.httpUtil.get('/tag/all').then(res => {
      this.tagList = res.data;
    });
  }

  /**
   * 显示密码框
   */
  showPassword(e) {
   if (e === 0) {
     this.isShowPassword = false;
   } else {
     this.isShowPassword = true;
     this.validateForm.get('password').setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(15)]);
   }
  }

  /**
   * 显示封面图上传
   * @param e 值
   */
  showUploadThumbnail(e) {
    this.isShowUploadThumbnail = e !== 0;
  }
}
