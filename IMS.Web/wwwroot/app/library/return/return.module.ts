import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ReturnRouting } from './return.route';
import { ReturnComponent } from './return.component';
import { ReturnService } from './return.service';

@NgModule({
  imports: [
    SharedModule,
    ReturnRouting
  ],
  declarations: [
    ReturnComponent,
  ],
  providers: [
    forwardRef(() => ReturnService)
  ]
})
export class ReturnModule {}