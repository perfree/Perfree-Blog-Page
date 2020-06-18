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
import { LayoutPortalDefaultComponent } from './layout/portal/layout-portal-default/layout-portal-default.component';
import { LayoutPortalHeaderComponent } from './layout/portal/layout-portal-header/layout-portal-header.component';
import { LayoutPortalAsideComponent } from './layout/portal/layout-portal-aside/layout-portal-aside.component';
import { LayoutPortalContentAsideComponent } from './layout/portal/layout-portal-content-aside/layout-portal-content-aside.component';
import { LayoutPortalFooterComponent } from './layout/portal/layout-portal-footer/layout-portal-footer.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminDefaultComponent,
    LayoutAdminHeaderComponent,
    LayoutAdminSideComponent,
    LayoutPortalDefaultComponent,
    LayoutPortalHeaderComponent,
    LayoutPortalAsideComponent,
    LayoutPortalContentAsideComponent,
    LayoutPortalFooterComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
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
