import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { BooksRouting } from './books.route';
import { BooksComponent } from './books.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { BookService } from './books.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    BooksRouting
  ],
  declarations: [
    BooksComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  providers: [
    forwardRef(() => BookService)
  ]
})
export class BooksModule {}