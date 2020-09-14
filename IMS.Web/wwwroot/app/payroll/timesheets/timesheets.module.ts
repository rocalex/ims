import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { TimesheetsRouting } from './timesheets.route';
import { TimesheetsComponent } from './timesheets.component';
import { TimeSheetService } from './timesheets.service';import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    SharedModule,
    TimesheetsRouting
  ],
  declarations: [
    TimesheetsComponent,
  ],
  providers: [
    forwardRef(() => TimeSheetService)
  ]
})
export class TimesheetsModule {}