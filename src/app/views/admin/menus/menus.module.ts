import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusListComponent } from './menus-list/menus-list.component';


@NgModule({
  declarations: [MenusListComponent],
  imports: [
    CommonModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }
