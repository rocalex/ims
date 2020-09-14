import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { PayslipRouting } from './payslip.route';
import { PayslipComponent } from './payslip.component';

@NgModule({
  imports: [
    SharedModule,
    PayslipRouting
  ],
  declarations: [
    PayslipComponent,
  ],
  providers: [

  ]
})
export class PayslipModule {}