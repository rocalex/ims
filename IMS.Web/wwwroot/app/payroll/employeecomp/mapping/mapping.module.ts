import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MappingComponent } from './mapping.component';
import { MappingService } from './mapping.service';
import { DialogOverviewExampleDialog, EditDialog } from './mapping.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    MappingComponent,
    DialogOverviewExampleDialog,
    EditDialog
  ],
  providers: [
    forwardRef(() => MappingService)
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    EditDialog
  ]
})
export class MappingModule {}