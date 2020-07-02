import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      key: [null, [Validators.required, Validators.maxLength(128)]],
      value: [null, [Validators.required, Validators.maxLength(128)]],
      remark: [null, [Validators.maxLength(255)]],
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
