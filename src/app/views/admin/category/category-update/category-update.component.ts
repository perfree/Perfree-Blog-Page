import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpUtil} from '../../../../core/net/httpUtil';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  @Input() data: any;
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
    this.avatarUrl = 'http://' + environment.SERVER_URL + this.data.categoryIcon;
    this.uploadFilePath = this.data.categoryIcon;
    // 初始化表单
    this.validateForm = this.fb.group({
      categoryName: [this.data.categoryName, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      categorySummary: [this.data.categorySummary],
      seq: [this.data.seq, [Validators.required, Validators.pattern('^[0-9]*$')]]
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
      this.validateForm.value.id = this.data.id;
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
