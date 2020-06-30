import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      account: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email]],
      sex: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(150)]],
      roles: [null, [Validators.required]],
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
    const role = [];
    role.push({id: this.validateForm.value.roles});
    this.validateForm.value.roles = role;
    if (this.validateForm.valid) {
      result.isSuccess = true;
      result.data = this.validateForm.value;
    }
    return result;
  }

}
