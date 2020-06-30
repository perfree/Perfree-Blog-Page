import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EditorMdDirective} from '../../directive/EditorMdDirective';
import {EditorConfig} from './editor-config';

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

  /**
   * markdown编辑器的属性配置
   */
  @Input() conf: EditorConfig;

  @ViewChild(EditorMdDirective, {static: false})
  private editorMdDirective: EditorMdDirective;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
  getEditorMarkdownComponentValue(): {markdown: string, html: string} {
    const obj: any = this.markdownForm.value;
    obj.html = this.editorMdDirective.getHtml();
    return obj;
  }
}
