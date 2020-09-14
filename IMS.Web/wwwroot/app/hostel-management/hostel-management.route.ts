import { Routes, RouterModule } from '@angular/router';

const hostelManagementRoutes: Routes = [
  {
    path: 'hostel',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

];
export const HostelManagementRouting = RouterModule.forRoot(hostelManagementRoutes);