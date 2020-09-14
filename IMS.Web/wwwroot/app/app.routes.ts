import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationManagementComponent } from './notification-management/notification-management.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'notifications', component: NotificationManagementComponent }
];
export const AppRouting = RouterModule.forRoot(appRoutes);
