import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelBedsRouting } from './hostel-beds.route';
import { HostelBedsComponent } from './hostel-beds.component';
import { BedService } from './hostel-beds.service';

@NgModule({
  imports: [
    SharedModule,
    HostelBedsRouting
  ],
  declarations: [
    HostelBedsComponent,
  ],
  providers: [
    forwardRef(() => BedService)
  ]
})
export class HostelBedsModule {}