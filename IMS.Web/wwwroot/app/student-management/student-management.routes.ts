import { Routes, RouterModule } from '@angular/router';

const studentManagementRoutes: Routes = [
  {
    path: 'student',
    children: [
      { path: '', redirectTo: 'nationality', pathMatch: 'full' }
    ]
  },

];
export const StudentManagementRouting = RouterModule.forRoot(studentManagementRoutes);