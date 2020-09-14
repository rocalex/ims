import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AutoSequenceManagementRouting } from './auto-sequence.routes';
import { AutoSequenceManagementComponent } from './auto-sequence.component';
import { AutoSequenceManagementService } from './auto-sequence.service';

@NgModule({
  imports: [
    SharedModule,
    //AutoSequenceManagementRouting
  ],
  declarations: [
    AutoSequenceManagementComponent
  ],
  providers: [
    AutoSequenceManagementService
  ],
})
export class AutoSequenceManagementModule { }
