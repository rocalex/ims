import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BranchComponent } from './branch.component';
import { BranchRouting } from './branch.route';
import { BranchService } from './branch.service';

@NgModule({
  imports: [
    SharedModule,
    BranchRouting,
  ],
  declarations: [
      BranchComponent
  ],
  providers: [
    forwardRef(() => BranchService)
  ]
})
export class BranchModule {}