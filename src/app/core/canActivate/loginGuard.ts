import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {StorageUtil} from '../storage/storageUtil';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

/**
 * 自定义路由守卫，实现用户登录检测
 * @author Perfree
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageUtil: StorageUtil,
    private route: ActivatedRoute
  ) {
  }
  canActivate() {
    // 获取本地保存的用户信息
    const localMsg = this.storageUtil.get(environment.LOCAL_STORAGE_NAME);
    if (localMsg !== undefined && localMsg !== null && localMsg !== '') {
      return true;
    }
    this.router.navigateByUrl('passport/login');
    return false;
  }
}
