import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-menus-update',
  templateUrl: './menus-update.component.html',
  styleUrls: ['./menus-update.component.css']
})
export class MenusUpdateComponent implements OnInit {
  @Input() data: any;
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      menuName: [this.data.menuName, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      menuIcon: [this.data.menuIcon, [Validators.maxLength(15)]],
      menuPath: [this.data.menuPath, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
      type: [this.data.type, [Validators.required]],
      target: [this.data.target, [Validators.required]],
      seq: [this.data.seq, [Validators.required]],
    });
    // 如果是系统默认的菜单,不允许修改路径和类型
    if (this.data.source === 0) {
      this.validateForm.get('menuPath').disable();
      this.validateForm.get('type').disable();
    }
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
