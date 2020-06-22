import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusListComponent } from './menus-list/menus-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenusCreateComponent } from './menus-create/menus-create.component';


@NgModule({
  declarations: [MenusListComponent, MenusCreateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    MenusRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MenusCreateComponent
  ]
})
export class MenusModule { }
