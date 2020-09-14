import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ItemTypeComponent } from './itemtype.component';
import { ItemTypeRouting } from './itemtype.route';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ItemTypeService } from './itemtype.service';

@NgModule({
  imports: [
    SharedModule,
    ItemTypeRouting,
  ],
  declarations: [
    ItemTypeComponent,
    AddComponent,
    EditComponent,
    ListComponent
  ],
  providers: [
    forwardRef(() => ItemTypeService)
  ]
})
export class ItemTypeModule {}