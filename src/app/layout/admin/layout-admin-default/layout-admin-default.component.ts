import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-layout-admin-default',
  templateUrl: './layout-admin-default.component.html',
  styleUrls: ['./layout-admin-default.component.css']
})
export class LayoutAdminDefaultComponent implements OnInit {
  isCollapsed = false;
  menus = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.menus = res.data;
    });
    this.switchUrl(this.menus);
  }

  /**
   * 获取要切换的url,如果为首次访问,即为获取首页url
   */
  switchUrl(menus) {
    let url = '';
    menus.forEach(menu => {
      if (menu.menuIsSelect) {
        if (menu.childMenu && menu.childMenu.length > 0) {
          url = this.switchUrl(menu.childMenu);
        } else {
          url = menu.menuPath;
        }
      }
    });
    if (url === '') {
      if (menus[0].childMenu.length > 0) {
        url = menus[0].childMenu[0].menuPath;
        menus[0].menuIsSelect = true;
        menus[0].childMenu[0].menuIsSelect = true;
      } else {
        url = menus[0].menuPath;
        menus[0].menuIsSelect = true;
      }
      this.router.navigateByUrl(url);
    }
    return url;
  }
}
