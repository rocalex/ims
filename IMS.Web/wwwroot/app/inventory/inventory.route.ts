import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'inventory',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

export const InventoryRouting = RouterModule.forRoot(routes);