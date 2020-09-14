import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LookUpComponent } from './lookup.component';
import { ItemTypeModule } from './itemtype/itemtype.module';
import { TaxTypeModule } from './taxtype/taxtype.module';
import { LookupRouting } from './lookup.route';
import { UOMModule } from './uom/uom.module';

@NgModule({
  imports: [
    SharedModule,
    ItemTypeModule,
    TaxTypeModule,
    UOMModule,
    LookupRouting
  ],
  declarations: [
    LookUpComponent
  ],
  providers: [

  ]
})
export class LookupModule {}