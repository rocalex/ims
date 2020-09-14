import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { DailyComponent } from './daily.component';
import { DailyExpenseService } from './daily.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DailyComponent
  ],
  providers: [
    forwardRef(() => DailyExpenseService)
  ],
})
export class DailyModule { }
