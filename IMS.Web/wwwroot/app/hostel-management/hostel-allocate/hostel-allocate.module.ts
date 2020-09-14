import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelAllocateRouting } from './hostel-allocate.route';
import { HostelAllocateComponent } from './hostel-allocate.component';
import { AllocateService } from './hostel-allocate.service';

@NgModule({
  imports: [
    SharedModule,
    HostelAllocateRouting
  ],
  declarations: [
    HostelAllocateComponent,
  ],
  providers: [
    forwardRef(() => AllocateService)
  ]
})
export class HostelAllocateModule {}