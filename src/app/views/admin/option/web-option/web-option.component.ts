import { HttpUtil } from './../../../../core/net/httpUtil';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectImageComponent } from 'src/app/shared/components/select-image/select-image.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-web-option',
  templateUrl: './web-option.component.html',
  styleUrls: ['./web-option.component.css']
})
export class WebOptionComponent implements OnInit {
  validateForm: FormGroup;
  imageInfo: any = null;
  @ViewChild('selectImage', {static: false}) selectImage: SelectImageComponent;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      webName: [null, [Validators.maxLength(120)]],
      webTitle: [null, [Validators.maxLength(120)]],
      webSubTitle: [null, [Validators.maxLength(120)]],
      webDomin: [null, [Validators.maxLength(120)]],
      caseNumber: [null, [Validators.maxLength(60)]],
      copyright: [null, [Validators.maxLength(128)]],
    });
    this.initForm();
  }

  /**
   * 加载初始数据
   */
  initForm() {
    this.httpUtil.get('/api/option/getWebOption').then(res => {
      if (res.code === 200) {
        this.validateForm.patchValue({
          webName: res.data.webName,
          webTitle: res.data.webTitle,
          webSubTitle: res.data.webSubTitle,
          webDomin: res.data.webDomin,
          caseNumber: res.data.caseNumber,
          copyright: res.data.copyright,
        });
        if (res.data.ico !== null && res.data.ico !== '') {
          this.imageInfo = {filePath: res.data.ico};
        }
      }
    });
  }

  /**
   * 保存
   */
  saveSettings() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm[i] !== null) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.validateForm.valid) {
      return;
    }
    const param = [
      { key: 'webName', value: this.validateForm.value.webName},
      { key: 'webTitle', value: this.validateForm.value.webTitle},
      { key: 'webSubTitle', value: this.validateForm.value.webSubTitle},
      { key: 'webDomin', value: this.validateForm.value.webDomin},
      { key: 'caseNumber', value: this.validateForm.value.caseNumber},
      { key: 'copyright', value: this.validateForm.value.copyright},
      { key: 'ico', value: this.selectImage.imgInfo === null ? null : this.selectImage.imgInfo.filePath}
    ];
    this.httpUtil.post('/api/option/webOption', param).then(res => {
      if (res.code === 200) {
        this.message.success('保存成功');
      } else {
        this.message.success('保存失败');
      }
    });
  }
}
