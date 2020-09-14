import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
  {
    path: 'inventory/location', component: LocationComponent
  }
];
export const LocationRouting = RouterModule.forRoot(routes);