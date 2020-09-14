import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: 'inventory/item', component: ItemComponent
  }
];
export const ItemRouting = RouterModule.forRoot(routes);