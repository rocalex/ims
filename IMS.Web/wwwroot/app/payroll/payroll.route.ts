import { Routes, RouterModule } from '@angular/router';

const payrollManagementRoutes: Routes = [
  {
    path: 'payroll',
    children: [
      { path: '', redirectTo: 'componentgroup', pathMatch: 'full' }
    ]
  },

];
export const PayrollRouting = RouterModule.forRoot(payrollManagementRoutes);