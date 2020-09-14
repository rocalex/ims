import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ComponentRouting } from './component.route';
import { ComponentComponent } from './component.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ComponentService } from './component.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    ComponentRouting
  ],
  declarations: [
    ComponentComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
    forwardRef(() => ComponentService)
  ]
})
export class ComponentModule {}