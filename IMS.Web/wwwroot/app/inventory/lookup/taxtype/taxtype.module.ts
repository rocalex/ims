import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TaxTypeComponent } from './taxtype.component';
import { TaxTypeRouting } from './taxtype.route';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { TaxTypeService } from './taxtype.service';

@NgModule({
  imports: [
    SharedModule,
    TaxTypeRouting,
  ],
  declarations: [
    TaxTypeComponent,
    AddComponent,
    EditComponent,
    ListComponent
  ],
  providers: [
    forwardRef(() => TaxTypeService)
  ]
})
export class TaxTypeModule {}