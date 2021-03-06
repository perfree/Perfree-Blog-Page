import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRoutingModule } from './option-routing.module';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionCreateComponent } from './option-create/option-create.component';
import { OptionUpdateComponent } from './option-update/option-update.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import { WebOptionComponent } from './web-option/web-option.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [OptionListComponent, OptionCreateComponent, OptionUpdateComponent, WebOptionComponent],
    imports: [
        CommonModule,
        OptionRoutingModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        SharedModule
    ],
  entryComponents: [
    OptionCreateComponent,
    OptionUpdateComponent
  ]
})
export class OptionModule { }
