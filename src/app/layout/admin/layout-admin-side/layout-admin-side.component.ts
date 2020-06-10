import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-admin-side',
  templateUrl: './layout-admin-side.component.html',
  styleUrls: ['./layout-admin-side.component.css']
})
export class LayoutAdminSideComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() menus;
  constructor(
  ) { }

  ngOnInit() {
  }
}
