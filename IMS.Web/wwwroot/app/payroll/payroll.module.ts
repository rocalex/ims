import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PayrollComponent } from './payroll.component';
import { PayrollRouting } from './payroll.route';
import { ComponentGroupModule } from './componentgroup/componentgroup.module';
import { ComponentModule } from './component/component.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { GenerateModule } from './generate/generate.module';
import { PayslipModule } from './payslip/payslip.module';
import { EmployeeCompModule } from './employeecomp/employeecomp.module';

@NgModule({
  imports: [
    SharedModule,
    PayrollRouting,
    ComponentGroupModule,
    ComponentModule,
    TimesheetsModule,
    GenerateModule,
    PayslipModule,
    EmployeeCompModule
  ],
  declarations: [
    PayrollComponent,
  ],
  providers: [

  ]
})
export class PayrollModule {}