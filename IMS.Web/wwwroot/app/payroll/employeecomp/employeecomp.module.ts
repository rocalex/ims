import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeCompComponent } from './employeecomp.component';
import { EmployeeCompRouting } from './employeecomp.route';
import { MappingModule } from './mapping/mapping.module';

@NgModule({
  imports: [
    SharedModule,
    EmployeeCompRouting,
    MappingModule
  ],
  declarations: [
    EmployeeCompComponent,
  ],
  providers: [
  ]
})
export class EmployeeCompModule {}