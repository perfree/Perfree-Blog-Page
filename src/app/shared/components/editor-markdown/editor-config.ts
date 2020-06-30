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
  public watch = true;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public imageUploadURL = '';
  public toolbarIcons = [  'undo', 'redo', '|',
    'bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|',
    'list-ul', 'list-ol', 'hr', '|',
    'link', 'reference-link', 'image', 'code', 'preformatted-text', 'code-block', 'table', 'datetime', 'emoji',
    'html-entities', 'pagebreak', '|',
    'goto-line', 'watch', 'preview', 'fullscreen', 'clear', 'search', '|',
    'help', 'info'];
  constructor(option: any = null) {
    Object.assign(this, option);
  }
}
