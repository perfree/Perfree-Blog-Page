import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import {NgZorroAntdModule, NzUploadModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryListComponent, CategoryUpdateComponent, CategoryCreateComponent],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    CommonModule,
    CategoryRoutingModule,
    NzUploadModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    CategoryCreateComponent,
    CategoryUpdateComponent
  ]
})
export class CategoryModule { }
