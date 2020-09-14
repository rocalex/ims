import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ReportRouting } from './reports.route';
import { ReportsComponent } from './reports.component';
import { ReportService } from './reports.service';
import { UserWiseComponent } from './userwise/userwise.component';
import { BookWiseComponent } from './bookwise/bookwise.component';

@NgModule({
  imports: [
    SharedModule,
    ReportRouting
  ],
  declarations: [
    ReportsComponent,
    BookWiseComponent,
    UserWiseComponent
  ],
  providers: [
    forwardRef(() => ReportService)
  ]
})
export class ReportsModule {}