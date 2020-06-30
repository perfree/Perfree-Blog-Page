import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent implements OnInit {
  validateForm: FormGroup;
  @Input() data: any;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      tagName: [this.data.tagName, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
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
      this.validateForm.value.id = this.data.id;
      result.isSuccess = true;
      result.data = this.validateForm.value;
    }
    return result;
  }
}
