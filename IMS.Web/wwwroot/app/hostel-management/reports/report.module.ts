import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ReportComponent } from './report.component';
import { ReportRouting } from './report.route';
import { AllocateComponent } from './allocate/allocate.component';
import { MessManageComponent } from './messmanage/messmanage.component';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    SharedModule,
    ReportRouting
  ],
  declarations: [
      ReportComponent,
      AllocateComponent,
      MessManageComponent
  ],
  providers: [
      forwardRef(() => ReportService)
  ],
})
export class ReportModule { }
