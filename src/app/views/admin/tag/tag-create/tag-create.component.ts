import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.css']
})
export class TagCreateComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      tagName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
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
      result.data = this.validateForm.value;
    }
    return result;
  }

}
