import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import { SelectImageComponent } from 'src/app/shared/components/select-image/select-image.component';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  imageInfo: any = null;
  @ViewChild('selectImage', {static: false}) selectImage: SelectImageComponent;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
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
      this.validateForm.value.categoryIcon = this.selectImage.imgInfo.filePath;
      result.data = this.validateForm.value;
    }
    return result;
  }
}
