import { Routes, RouterModule } from '@angular/router';
import { DriverDashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
    { path: 'dashboard', component: DriverDashboardComponent },
];

export const DashboardRoutes = RouterModule.forRoot(dashboardRoutes);
