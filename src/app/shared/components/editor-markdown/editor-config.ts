import {EditorMarkdownComponent} from './editor-markdown.component';

export class EditorConfig {
  public width = '100%';
  public height = '100%';
  // 下载的editor.md的地址
  public path = 'assets/editor.md/lib/';
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public emoji = true;
  public taskList = true;
  public tex = true;
  public readOnly = false;
  public tocm = true;
  public watch = false;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public imageUpload = false;
  public theme = 'white';
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public crossDomainUpload = true;
  public imageUploadURL = 'http://127.0.0.1:8080/upload/img';
  public toolbarIcons = [  'undo', 'redo', '|',
    'bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|',
    'list-ul', 'list-ol', 'hr', '|',
    'link', 'reference-link', 'selectImage', 'code', 'preformatted-text', 'code-block', 'table', 'datetime',
    'html-entities', '|',
    'goto-line', 'watch', 'preview', 'fullscreen', 'clear', 'search'];
  public placeholder = '开启文字之旅...';
  public toolbarCustomIcons = {
  };
  public  toolbarIconsClass = {
    selectImage: 'fa-image'
  };
  public toolbarHandlers = {
    selectImage(cm, icon, cursor, selection) {
      EditorMarkdownComponent.selectImage(cm, icon, cursor, selection, 0 , null);
    }
  };
  constructor(option: any = null) {
    Object.assign(this, option);
  }
}
