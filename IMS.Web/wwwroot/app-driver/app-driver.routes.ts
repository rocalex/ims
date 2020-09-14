import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationManagementComponent } from './notification-management/notification-management.component';

const driverAppRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'profile', component: UserProfileComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'notifications', component: NotificationManagementComponent }
];
export const DriverAppRouting = RouterModule.forRoot(driverAppRoutes);
