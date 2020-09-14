import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelBlockRouting } from './hostel-block.route';
import { HostelBlockComponent } from './hostel-block.component';
import { HostelBlockListComponent } from './hostel-block-list/hostel-block-list.component';
import { HostelBlockAddComponent } from './hostel-block-add/hostel-block-add.component';
import { HostelBlockService } from './hostel-block.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    HostelBlockRouting
  ],
  declarations: [
    HostelBlockComponent,
    HostelBlockListComponent,
    HostelBlockAddComponent,
    EditComponent,
  ],
  providers: [
    forwardRef(() => HostelBlockService)
  ]
})
export class HostelBlockModule {}