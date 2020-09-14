import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ExampaperRouting } from './exampaper.route';
import { ExampaperComponent } from './exampaper.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ExamPaperService } from './exampaper.service';

@NgModule({
  imports: [
    SharedModule,
    ExampaperRouting
  ],
  declarations: [
    ExampaperComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  providers: [
    forwardRef(() => ExamPaperService)
  ]
})
export class ExampaperModule {}