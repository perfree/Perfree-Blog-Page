import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    UserCreateComponent,
    UserUpdateComponent
  ]
})
export class UserModule { }
