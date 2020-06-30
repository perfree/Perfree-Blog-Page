import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  validateForm: FormGroup;
  @Input() data: any;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    let role;
    for (const item of this.data.roles) {
      role = item.id;
    }
    console.log(role);
    // 初始化表单
    this.validateForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      account: [this.data.account, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: [null, [Validators.minLength(6), Validators.maxLength(12)]],
      email: [this.data.email, [Validators.required, Validators.email]],
      sex: [this.data.sex.toString(), [Validators.required]],
      age: [this.data.age, [Validators.required, Validators.min(0), Validators.max(150)]],
      roles: [role.toString(), [Validators.required]],
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
