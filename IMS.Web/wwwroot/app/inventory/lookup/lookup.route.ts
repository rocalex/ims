import { Routes, RouterModule } from '@angular/router';
import { LookUpComponent } from './lookup.component';

const routes: Routes = [
  {
    path: 'inventory/lookup', component: LookUpComponent
  }
];
export const LookupRouting = RouterModule.forRoot(routes);