import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelFloorRouting } from './hostel-floor.route';
import { HostelFloorComponent } from './hostel-floor.component';
import { DetailComponent, DialogOverviewExampleDialog, EditDialog } from './detail/detail.component';
import { FloorRoomService } from './hostel-floor.service';

@NgModule({
  imports: [
    SharedModule,
    HostelFloorRouting
  ],
  declarations: [
    HostelFloorComponent,
    DetailComponent,
    DialogOverviewExampleDialog,
    EditDialog
  ],
  providers: [
    forwardRef(() => FloorRoomService)
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    EditDialog
  ]
})
export class HostelFloorModule {}