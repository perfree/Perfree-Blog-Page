import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpUtil} from '../../../../core/net/httpUtil';
import { SelectImageComponent } from 'src/app/shared/components/select-image/select-image.component';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  @Input() data: any;
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
    this.imageInfo = {filePath: this.data.categoryIcon};
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
      this.validateForm.value.categoryIcon = this.selectImage.imgInfo.filePath;
      result.data = this.validateForm.value;
    }
    return result;
  }
}
