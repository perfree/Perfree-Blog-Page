import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpUtil} from '../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.css']
})
export class ImagePanelComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  uploadUrl;
  uploadFilePath;

  // 分页相关
  pageIndex = 1;
  pageSize = 6;
  imageListTotal = 1;
  listOfData = [];
  uploadImg: any = null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectImg: EventEmitter<string> = new EventEmitter<string>();
  serverUrl;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.serverUrl = 'http://' + environment.SERVER_URL;
    this.uploadUrl = 'http://' + environment.SERVER_URL + '/upload/img';
    this.searchData(true);
  }

  /**
   * 上传改变事件
   * @param info 信息
   */
  handleChange(info): void {
    if (info.file.status === 'done') {
      this.uploadFilePath = info.file.response.url;
      this.avatarUrl = 'http://' + environment.SERVER_URL + info.file.response.url;
      this.uploadImg = info.file.response;
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 上传失败`);
    }
  }

  /**
   * 加载数据
   * @param reset 重置
   */
  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      pageIndex: 1,
      pageSize: 6,
      form: null,
    };
    param.pageIndex = this.pageIndex;
    param.pageSize = this.pageSize;
    this.httpUtil.post('/attach/imageList', param).then(res => {
      this.imageListTotal = res.total;
      this.listOfData = res.data;
    });
  }

  /**
   * 选中图片
   * @param data 数据
   */
  selectImg(data) {
    this.onSelectImg.emit(data);
  }

  /**
   * 选中上传图片
   */
  selectUploadImg() {
    if (this.uploadImg !== null && this.uploadImg !== '') {
      this.onSelectImg.emit(this.uploadImg);
    } else {
      this.msg.error('请上传图片');
    }
  }
}
