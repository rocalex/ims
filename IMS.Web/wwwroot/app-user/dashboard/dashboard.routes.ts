import { Routes, RouterModule } from '@angular/router';
import { AppUserDashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
    { path: 'dashboard', component: AppUserDashboardComponent },
];

export const DashboardRoutes = RouterModule.forRoot(dashboardRoutes);
