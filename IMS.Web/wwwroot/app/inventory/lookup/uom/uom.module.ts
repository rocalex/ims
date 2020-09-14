import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UOMComponent } from './uom.component';
import { UOMRouting } from './uom.route';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UOMService } from './uom.service';

@NgModule({
  imports: [
    SharedModule,
    UOMRouting,
  ],
  declarations: [
    UOMComponent,
    AddComponent,
    EditComponent,
    ListComponent
  ],
  providers: [
    forwardRef(() => UOMService)
  ]
})
export class UOMModule {}