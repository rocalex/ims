import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { LookupRouting } from './lookup.route';
import { LookupComponent } from './lookup.component';
import { LookupService } from './lookup.service';
import { RoomTypeEditComponent } from './roomtype/edit/edit.component';
import { RoomTypeAddComponent } from './roomtype/add/add.component';
import { RoomTypeListComponent } from './roomtype/list/list.component';
import { BedStatusEditComponent } from './bedstatus/edit/edit.component';
import { BedStatusAddComponent } from './bedstatus/add/add.component';
import { BedStatusListComponent } from './bedstatus/list/list.component';

@NgModule({
  imports: [
    SharedModule,
    LookupRouting
  ],
  declarations: [
    LookupComponent,
    RoomTypeEditComponent,
    RoomTypeAddComponent,
    RoomTypeListComponent,
    BedStatusEditComponent,
    BedStatusAddComponent,
    BedStatusListComponent
  ],
  providers: [
    forwardRef(() => LookupService)
  ]
})
export class LookupModule {}