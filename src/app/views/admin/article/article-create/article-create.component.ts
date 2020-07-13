import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EditorMarkdownComponent} from '../../../../shared/components/editor-markdown/editor-markdown.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {EditorConfig} from '../../../../shared/components/editor-markdown/editor-config';
import {SelectImageComponent} from '../../../../shared/components/select-image/select-image.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit{

  // markdown的内容
  markdown: string;
  @ViewChild('editorMarkdownDom', {static: false}) editorMarkdownDom: EditorMarkdownComponent;
  // editor的配置参数信息
  config: EditorConfig;
  validateForm: FormGroup;
  @ViewChild('selectImage', {static: false}) selectImage: SelectImageComponent;
  categoryList = [];
  tagList = [];
  isShowPassword = false;
  isShowUploadThumbnail = false;
  imageInfo: any = null;
  updateData: any = null;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    public storageUtil: StorageUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.config = new EditorConfig({height: '700px'});
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
    this.route.queryParams.subscribe((res: any) => {
      if (res.id !== null && res.id !== undefined && res.id !== '') {
        this.getUpdateData(res);
      }
    });
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

  /**
   * 保存文章
   * @param type 类型0:发布,1:保存草稿
   */
  saveArticle(type) {
    for (const i in this.validateForm.controls) {
      if (this.validateForm[i] !== null) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.validateForm.valid) {
      return;
    }
    const articleContent = this.editorMarkdownDom.getEditorMarkdownComponentValue();
    if (articleContent === null || articleContent === '') {
      this.message.error('请输入文章内容');
      return;
    }
    if (this.validateForm.value.thumbnailType !== 0) {
      if (this.selectImage.imgInfo === null) {
        this.message.error('请选择封面图片');
        return;
      }
      this.validateForm.value.thumbnailId = this.selectImage.imgInfo.id;
    }
    // 标签处理
    if (this.validateForm.value.tagId !== null && this.validateForm.value.tagId.length > 0) {
      const tags = [];
      const addTags = [];
      this.validateForm.value.tagId.forEach(res => {
        const index = this.tagList.map((item) => item.id).indexOf(res);
        if (index <= -1) {
          addTags.push( {tagName: res});
        } else {
          tags.push( {tagId: res});
        }
      });
      this.validateForm.value.articleTags = tags;
      this.validateForm.value.tags = addTags;
    }
    this.validateForm.value.articleContent = articleContent;
    this.validateForm.value.isDraft = type;
    let url = '/article/add';
    if (this.updateData !== null) {
      url = '/article/update';
      this.validateForm.value.id = this.updateData.id;
    }
    this.httpUtil.post(url, this.validateForm.value).then(res => {
      if (res.code === 200) {
        this.router.navigate(['/admin/article/create/success'], {queryParams: {articleId: res.data, type}});
      } else {
        this.message.error(res.msg);
      }
    });
  }

  /**
   * 获取更新的数据
   * @param data 数据
   */
  getUpdateData(data) {
    this.httpUtil.get('/article/getArticleById/' + data.id).then(res => {
      if (res.code === 200) {
        const tags = [];
        res.data.tags.forEach(o => {
          tags.push(o.id);
        });
        this.updateData = res.data;
        this.validateForm.patchValue({
          articleTitle: res.data.articleTitle,
          categoryId: res.data.categoryId,
          tagId: tags,
          articleSummary: res.data.articleSummary,
          keyword: res.data.keyword,
          status: res.data.status,
          isEncrypt: res.data.isEncrypt,
          password: null,
          thumbnailType: res.data.thumbnailType,
          isAllowComment: res.data.isAllowComment
        });
        this.markdown = res.data.articleContent;
        if (res.data.attach.id !== null && res.data.attach.id !== undefined) {
          this.imageInfo = res.data.attach;
        }
      }
    });
  }
}
