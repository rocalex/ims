import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { ExpenseRouting } from './expense.route';
import { ExpenseComponent } from './expense.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ExpenseService } from './expense.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    ExpenseRouting
  ],
  declarations: [
    ExpenseComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
    forwardRef(() => ExpenseService)
  ]
})
export class ExpenseTypeModule {}