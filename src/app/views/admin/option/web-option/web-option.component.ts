import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-web-option',
  templateUrl: './web-option.component.html',
  styleUrls: ['./web-option.component.css']
})
export class WebOptionComponent implements OnInit {
  validateForm: FormGroup;
  imageInfo: any = null;
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
}
