import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { BooktypeRouting } from './booktype.route';
import { BooktypeComponent } from './booktype.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { BookTypeService } from './booktype.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    BooktypeRouting
  ],
  declarations: [
    BooktypeComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  providers: [
    forwardRef(() => BookTypeService)
  ]
})
export class BooktypeModule {}