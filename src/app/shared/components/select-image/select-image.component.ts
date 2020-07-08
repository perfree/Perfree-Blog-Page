import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ImagePanelComponent} from '../image-panel/image-panel.component';
import {FormBuilder} from '@angular/forms';
import {HttpUtil} from '../../../core/net/httpUtil';
import {StorageUtil} from '../../../core/storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {
  // 选择图片的弹出框
  @ViewChild('imagePanel', { static: false, read: ViewContainerRef }) imagePanel: ViewContainerRef;
  public imagePanelComponent;
  isImagePanelVisible = false;
  @Input() imgInfo: any = null;
  serverUrl;
  isShowDelete = false;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    public storageUtil: StorageUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.serverUrl = 'http://' + environment.SERVER_URL;
  }


  /**
   * 选择图片
   */
  selectImg() {
    this.imagePanel.clear();
    const dom = this.cfr.resolveComponentFactory(ImagePanelComponent);
    this.imagePanelComponent = this.imagePanel.createComponent(dom);
    this.imagePanelComponent.instance.onSelectImg.subscribe((res) => {
      this.imgInfo = res;
      this.isImagePanelVisible = false;
      this.imagePanelComponent.destroy();
    });
    this.isImagePanelVisible = true;
  }

  /**
   * 图片面板取消
   */
  imagePanelHandleCancel() {
    this.isImagePanelVisible = false;
    this.imagePanelComponent.destroy();
  }

  /**
   * 删除图片
   */
  deleteImage() {
    this.imgInfo = null;
  }
}
