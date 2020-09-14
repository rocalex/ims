import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { HostelSwapRouting } from './hostel-swap.route';
import { HostelSwapComponent, DialogOverviewExampleDialog } from './hostel-swap.component';
import { SwapService } from './hostel-swap.service';

@NgModule({
  imports: [
    SharedModule,
    HostelSwapRouting
  ],
  declarations: [
    HostelSwapComponent,
    DialogOverviewExampleDialog
  ],
  providers: [
    forwardRef(() => SwapService)
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class HostelSwapModule {}