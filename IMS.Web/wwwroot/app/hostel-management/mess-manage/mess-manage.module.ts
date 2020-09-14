import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MessManageRouting } from './mess-manage.route';
import { MessManageComponent } from './mess-manage.component';
import { MessmanageModule } from './messmanage/messmanage.module';
import { DailyModule } from './daily/daily.module';
import { ExpenditureModule } from './expenditure/expenditure.module';
import { ExpenseTypeModule } from './expense/expense.module';

@NgModule({
  imports: [
    SharedModule,
    MessManageRouting,
    MessmanageModule,
    DailyModule,
    ExpenditureModule,
    ExpenseTypeModule
  ],
  declarations: [
    MessManageComponent,
  ],
  providers: [
  ],
})
export class MessManageModule { }
