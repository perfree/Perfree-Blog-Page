import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OptionListComponent} from './option-list/option-list.component';
import { WebOptionComponent } from './web-option/web-option.component';


const routes: Routes = [
  {path: '', component: WebOptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRoutingModule { }
