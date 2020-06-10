import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';



@NgModule({
  declarations: [VerifyCodeComponent],
  exports: [
    VerifyCodeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
