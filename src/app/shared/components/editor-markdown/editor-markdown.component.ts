import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EditorMdDirective} from '../../directive/EditorMdDirective';
import {EditorConfig} from './editor-config';
import {EditorImage} from './editor-image';
import {environment} from '../../../../environments/environment';
import {CategoryCreateComponent} from '../../../views/admin/category/category-create/category-create.component';
import {ImagePanelComponent} from '../image-panel/image-panel.component';

@Component({
  selector: 'app-editor-markdown',
  templateUrl: './editor-markdown.component.html',
  styleUrls: ['./editor-markdown.component.css']
})
export class EditorMarkdownComponent implements OnInit {
  /**
   * markdown文章内容表单控件
   */
  markdownForm: FormGroup;

  /**
   * 原先的markdown文档内容
   */
  private oldMarkdownContent: string;

  // markdown编辑器的属性配置
  @Input() conf: EditorConfig;

  @ViewChild(EditorMdDirective, {static: false})
  private editorMdDirective: EditorMdDirective;
  editorImage = EditorImage;

  // 选择图片的弹出框
  @ViewChild('imagePanel', { static: false, read: ViewContainerRef }) imagePanel: ViewContainerRef;
  public imagePanelComponent;

  static selectImage(cm, icon, cursor, selection, type, image) {
    if (type === 0) {
      EditorImage.cm = cm;
      EditorImage.icon = icon;
      EditorImage.cursor = cursor;
      EditorImage.selection = selection;
      EditorImage.isSelectImageModelVisible = true;
    } else {
      // 替换选中文本，如果没有选中文本，则直接插入
      EditorImage.cm.replaceSelection('![' + image.fileName + ']' + '(' +
        'http://' + environment.SERVER_URL + image.filePath + ' ' + '"' + image.fileName + '")');
      // 如果当前没有选中的文本，将光标移到要输入的位置
      if (EditorImage.selection === '') {
        EditorImage.cm.setCursor(EditorImage.cursor.line, EditorImage.cursor.ch + 1);
      }
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cfr: ComponentFactoryResolver,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.markdownForm = this.fb.group({
      markdown: [this.oldMarkdownContent, [Validators.required]]
    });
  }

  @Input() set oldMarkdownContents(value: string) {
    this.oldMarkdownContent = value;
    // markdownForm初始化了,先执行@Input在执行ngOnInit
    if (this.markdownForm) {
      this.markdownForm.patchValue({
        markdown: value
      });
    }
  }

  get markdown(): FormControl {
    return this.markdownForm.get('markdown') as FormControl;
  }

  /**
   * 同步属性内容
   * @param str 输入的markdown文档
   */
  syncModel(str): void {
    this.markdown.setValue(str);
  }

  /**
   * 判断是否修改过
   */
  get isDirtyMarkdown() {
    return this.oldMarkdownContent === this.markdownForm.value.markdown;
  }

  /**
   * 得到editor编辑器里面的值
   */
  getEditorMarkdownComponentValue() {
    return this.editorMdDirective.getMarkdown();
  }

  /**
   * 图片选择面板取消
   */
  imagePanelHandleCancel() {
    this.editorImage.isSelectImageModelVisible = false;
    this.imagePanelComponent.destroy();
  }

  openImagePanel() {
    this.imagePanel.clear();
    const dom = this.cfr.resolveComponentFactory(ImagePanelComponent);
    this.imagePanelComponent = this.imagePanel.createComponent(dom);
    this.imagePanelComponent.instance.onSelectImg.subscribe(res => {
      EditorMarkdownComponent.selectImage(null, null, null, null, 1 , res);
      this.editorImage.isSelectImageModelVisible = false;
      this.imagePanelComponent.destroy();
    });
  }
}
