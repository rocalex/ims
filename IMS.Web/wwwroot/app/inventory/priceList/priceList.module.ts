import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PriceListComponent } from './priceList.component';
import { PriceListRouting } from './priceList.route';
import { PriceListService } from './priceList.service';

@NgModule({
  imports: [
    SharedModule,
    PriceListRouting,
  ],
  declarations: [
      PriceListComponent
  ],
  providers: [
    forwardRef(() => PriceListService)
  ]
})
export class PriceListModule {}