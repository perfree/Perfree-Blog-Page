import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageUtil} from '../../../core/storage/storageUtil';
import {HttpUtil} from '../../../core/net/httpUtil';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-layout-admin-header',
  templateUrl: './layout-admin-header.component.html',
  styleUrls: ['./layout-admin-header.component.css']
})
export class LayoutAdminHeaderComponent implements OnInit {

  user: any;
  constructor(
    private storageUtil: StorageUtil,
    private http: HttpUtil,
    private router: Router,
  ) { }

  ngOnInit() {
    this.http.get('/getUserInfo').then(res => {
      if (res.code === 200) {
        this.user = res.data;
      }
    });
  }

  /**
   * 退出登录
   */
  logOut() {
    this.storageUtil.remove(environment.LOCAL_STORAGE_NAME);
    this.router.navigate(['/passport/login']);
  }
}
