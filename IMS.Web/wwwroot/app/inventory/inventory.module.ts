import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InventoryComponent } from './inventory.component';
import { LookupModule } from './lookup/lookup.module';
import { InventoryRouting } from './inventory.route';
import { LocationModule } from './location/location.module';
import { BranchModule } from './branch/branch.module';
import { ItemModule } from './item/item.module';
import { PriceListModule } from './priceList/priceList.module';

@NgModule({
  imports: [
    SharedModule,
    LookupModule,
    LocationModule,
    BranchModule,
    ItemModule,
    PriceListModule,
    InventoryRouting
  ],
  declarations: [
    InventoryComponent,
  ],
  providers: [

  ]
})
export class InventoryModule {}