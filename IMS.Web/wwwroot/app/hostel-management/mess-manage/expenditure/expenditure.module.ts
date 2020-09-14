import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ExpenditureComponent } from './expenditure.component';
import { ExpenditureService } from './expenditure.srevice';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ExpenditureComponent
  ],
  providers: [
    forwardRef(() => ExpenditureService)
  ],
})
export class ExpenditureModule { }
