import { Routes, RouterModule } from '@angular/router';

const staffManagementRoutes: Routes = [
  {
    path: 'student',
    children: [
      { path: '', redirectTo: 'department', pathMatch: 'full' }
    ]
  },

];
export const StaffManagementRouting = RouterModule.forRoot(staffManagementRoutes);