import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-layout-admin-side',
  templateUrl: './layout-admin-side.component.html',
  styleUrls: ['./layout-admin-side.component.css']
})
export class LayoutAdminSideComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() menus;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('?')[0];
        this.switchMenu(url);
      }
    });
  }

  private switchMenu(url) {
    this.menus.forEach(menu => {
      menu.menuIsSelect = false;
      if (menu.childMenu && menu.childMenu.length > 0) {
        menu.childMenu.forEach(childMenu => {
          childMenu.menuIsSelect = false;
          if (childMenu.menuPath === url) {
            childMenu.menuIsSelect = true;
            menu.menuIsSelect = true;
          }
        });
      }
      if (menu.menuPath === url) {
        menu.menuIsSelect = true;
      }
    });
  }
}
