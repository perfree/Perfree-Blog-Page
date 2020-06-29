import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  avatarUrl?: string;
  uploadUrl;
  uploadFilePath;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.uploadUrl = 'http://' + environment.SERVER_URL + '/upload/img';
    // 初始化表单
    this.validateForm = this.fb.group({
      categoryName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      categorySummary: [null],
      seq: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  /**
   * 获取form表单值
   */
  getFormValue() {
    const result = {
      isSuccess: false,
      data: {}
    };
    for (const i in this.validateForm.controls) {
      if (this.validateForm[i] !== null) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      result.isSuccess = true;
      this.validateForm.value.categoryIcon = this.uploadFilePath;
      result.data = this.validateForm.value;
    }
    return result;
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
