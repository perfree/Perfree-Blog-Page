/**
 * 进入页面前预先加载菜单等数据
 * @author YinPengFei
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {LayoutAdminDefaultComponent} from './layout-admin-default/layout-admin-default.component';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpUtil} from '../../core/net/httpUtil';

@Injectable()
export class LayoutAdminDefaultResolver implements Resolve<LayoutAdminDefaultComponent> {

  constructor(
    private httpUtil: HttpUtil,
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.httpUtil.pipGet('/api/getAdminMenuByAccount').pipe(map((res: any) => {
      if (res.code === 200) {
        const url = state.url;
        let menus = res.data;
        if (url !== '/') {
          menus = this.renderMenu(url.split('?')[0], res.data);
        } else {
          if (menus.length > 0 && menus[0].childMenu.length > 0) {
            menus[0].menuIsSelect = true;
            menus[0].childMenu[0].menuIsSelect = true;
          }
          if (menus.length > 0 && menus[0].childMenu.length <= 0) {
            menus[0].menuIsSelect = true;
          }
        }
        return menus;
      } else {
        this.message.error('系统初始化失败,请重新登录!');
        this.router.navigateByUrl('/admin/passport/login');
      }
    }));
  }

  /**
   * 渲染菜单
   */
  renderMenu(currUrl, menus) {
    menus.forEach(res => {
      // 如果当前菜单url等于当前url,更改选中状态
      if (res.menuPath === currUrl) {
        res.menuIsSelect = true;
      } else {
        if (res.childMenu.length > 0) {
          res.childMenu.forEach(childMenu => {
            if (childMenu.menuPath === currUrl) {
              childMenu.menuIsSelect = true;
              res.menuIsSelect = true;
            } else {
              childMenu.menuIsSelect = false;
            }
          });
        } else {
          res.menuIsSelect = false;
        }
      }
    });
    return menus;
  }
}
