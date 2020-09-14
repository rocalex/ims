import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LibraryComponent } from './library.component';
import { LibraryRouting } from './library.route';
import { DashboardModule } from './dashboard/dashboard.module';
import { BooktypeModule } from './booktype/booktype.module';
import { BooksModule } from './books/books.module';
import { ExampaperModule } from './exampaper/exampaper.module';
import { IssuebookModule } from './issuebook/issuebook.module';
import { ReturnModule } from './return/return.module';
import { ReportsModule } from './reports/reports.module';

@NgModule({
  imports: [
    SharedModule,
    LibraryRouting,
    DashboardModule,
    BooktypeModule,
    BooksModule,
    ExampaperModule,
    IssuebookModule,
    ReturnModule,
    ReportsModule
  ],
  declarations: [
    LibraryComponent,
  ],
  providers: [

  ]
})
export class LibraryModule {}