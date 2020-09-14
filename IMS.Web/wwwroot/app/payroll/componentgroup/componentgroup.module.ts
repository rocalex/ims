import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ComponentGroupRouting } from './componentgroup.route';
import { ComponentgroupComponent } from './componentgroup.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ComponentGroupService } from './componentgroup.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    ComponentGroupRouting
  ],
  declarations: [
    ComponentgroupComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
    forwardRef(() => ComponentGroupService)
  ]
})
export class ComponentGroupModule {}