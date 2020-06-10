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
    this.router.navigateByUrl(this.switchUrl(this.menus));
  }

  /**
   * 获取要切换的url,如果为首次访问,即为获取首页url
   */
  switchUrl(menus) {
    let url = '';
    menus.forEach(menu => {
      if (menu.menuIsSelect) {
        if (menu.childMenu.length > 0) {
          url = this.switchUrl(menu.childMenu);
        } else {
          url = menu.menuPath;
        }
      }
    });
    return url;
  }
}
