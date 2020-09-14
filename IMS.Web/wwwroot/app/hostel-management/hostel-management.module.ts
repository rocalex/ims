import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HostelManagementComponent } from './hostel-management.component';
import { HostelManagementDashboardModule } from './hostel-management-dashboard/hostel-management-dashboard.module';
import { HostelManagementRouting } from './hostel-management.route';
import { HostelManagementHostelModule } from './hostel-management-hostel/hostel-management-hostel.module';
import { HostelBlockModule } from './hostel-block/hostel-block.module';
import { HostelFloorModule } from './hostel-floor/hostel-floor.module';
import { HostelAllocateModule } from './hostel-allocate/hostel-allocate.module';
import { HostelBedsModule } from './hostel-beds/hostel-beds.module';
import { HostelSwapModule } from './hostel-swap/hostel-swap.module';
import { LookupModule } from './lookup/lookup.module';
import { MessManageModule } from './mess-manage/mess-manage.module';
import { ReportModule } from './reports/report.module';

@NgModule({
  imports: [
    SharedModule,
    HostelManagementRouting,
    HostelManagementDashboardModule,
    HostelManagementHostelModule,
    HostelBlockModule,
    HostelFloorModule,
    HostelAllocateModule,
    HostelBedsModule,
    HostelSwapModule,
    LookupModule,
    MessManageModule,
    ReportModule
  ],
  declarations: [
    HostelManagementComponent,
  ],
  providers: [

  ]
})
export class HostelManagementModule {}