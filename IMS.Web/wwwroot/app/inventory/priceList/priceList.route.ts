import { Routes, RouterModule } from '@angular/router';
import { PriceListComponent } from './priceList.component';

const routes: Routes = [
  {
    path: 'inventory/pricelist', component: PriceListComponent
  }
];
export const PriceListRouting = RouterModule.forRoot(routes);