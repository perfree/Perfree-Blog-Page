import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagUpdateComponent } from './tag-update/tag-update.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TagListComponent, TagCreateComponent, TagUpdateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    TagRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TagCreateComponent,
    TagUpdateComponent
  ]
})
export class TagModule { }
