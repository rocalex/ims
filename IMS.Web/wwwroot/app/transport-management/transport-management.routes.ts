import { Routes, RouterModule } from '@angular/router';

const transportManagementRoutes: Routes = [
  {
    path: 'transportmanagement',
    children: [
      { path: '', redirectTo: 'vehiclemaster', pathMatch: 'full' }
    ]
  },

];
export const TransportManagementRouting = RouterModule.forRoot(transportManagementRoutes);