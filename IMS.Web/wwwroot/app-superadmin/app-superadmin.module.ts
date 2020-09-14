import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SuperAdminAppComponent } from './app-superadmin.component';
import { SharedModule } from '../shared/shared.module';
import { InstituteManagementModule } from './institute-management/institute-management.module';
import { SuperAdminAppRouting } from './app-superadmin.routes';
import { HttpService } from '../core/http.service';
import { ResourceFileManagementModule } from './resource-file/resource-file.module';

@NgModule({
  declarations: [
    SuperAdminAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    InstituteManagementModule,
    SuperAdminAppRouting,
    ResourceFileManagementModule
  ],
  providers: [HttpService],
  bootstrap: [SuperAdminAppComponent]
})
export class SuperAdminAppModule { }
