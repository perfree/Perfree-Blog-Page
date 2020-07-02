import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-option-update',
  templateUrl: './option-update.component.html',
  styleUrls: ['./option-update.component.css']
})
export class OptionUpdateComponent implements OnInit {

  @Input() data: any;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.data);
    // 初始化表单
    this.validateForm = this.fb.group({
      id: [this.data.id],
      key: [this.data.key, [Validators.required, Validators.maxLength(128)]],
      value: [this.data.value, [Validators.required, Validators.maxLength(128)]],
      remark: [this.data.remark, [Validators.maxLength(255)]],
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
