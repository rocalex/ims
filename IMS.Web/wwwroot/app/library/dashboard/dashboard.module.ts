import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { DashboardRouting } from './dashboard.route';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ]
})
export class DashboardModule {}