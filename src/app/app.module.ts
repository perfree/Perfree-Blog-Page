import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutAdminDefaultComponent} from './layout/admin/layout-admin-default/layout-admin-default.component';
import {LayoutAdminHeaderComponent} from './layout/admin/layout-admin-header/layout-admin-header.component';
import {LayoutAdminSideComponent} from './layout/admin/layout-admin-side/layout-admin-side.component';
import {LayoutAdminDefaultResolver} from './layout/admin/layout-admin-default.resolver';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpUtil} from './core/net/httpUtil';
import {StorageUtil} from './core/storage/storageUtil';
import {SubjectUtil} from './core/storage/subjectUtil';
import {Kit} from './core/common/Kit';
import {DatePipe} from '@angular/common';
import {DefaultInterceptor} from './core/net/default.Interceptor';
import {LoginGuard} from './core/canActivate/loginGuard';

@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminDefaultComponent,
    LayoutAdminHeaderComponent,
    LayoutAdminSideComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    HttpUtil,
    StorageUtil,
    SubjectUtil,
    Kit,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
    LoginGuard,
    LayoutAdminDefaultResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
