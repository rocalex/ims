import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { IssuebookRouting } from './issuebook.route';
import { IssuebookComponent } from './issuebook.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { IssueBookService } from './issuebook.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    IssuebookRouting
  ],
  declarations: [
    IssuebookComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  providers: [
    forwardRef(() => IssueBookService)
  ]
})
export class IssuebookModule {}