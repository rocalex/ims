import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';

const adminDashboardManagementRoutes: Routes = [
    { path: 'dashboard', component: AdminDashboardComponent },

];
export const AdminDashboardManagementRouting = RouterModule.forRoot(adminDashboardManagementRoutes);