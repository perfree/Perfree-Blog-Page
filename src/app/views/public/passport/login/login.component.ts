import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {VerifyCodeComponent} from '../../../../shared/components/verify-code/verify-code.component';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('verifyCode', { static: false}) verifyCode: VerifyCodeComponent; // 获取页面中的验证码组件
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpUtil,
    private storageUtil: StorageUtil,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      verifyCode: [null, [Validators.required]]
    });
  }

  /**
   * 登录表单提交
   */
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const flag = this.verifyCode.validate(this.validateForm.get('verifyCode').value);
    if (!flag) {
      return this.validateForm.get('verifyCode').setErrors({ error: true, duplicated: true });
    }
    this.http.post('/login', this.validateForm.value).then(res => {
      if (res && res.code === 200 ) {
        this.storageUtil.set(environment.LOCAL_STORAGE_NAME, res.data);
        this.router.navigate(['/']);
      } else {
        this.message.error(res.msg);
      }
    });
  }

}
