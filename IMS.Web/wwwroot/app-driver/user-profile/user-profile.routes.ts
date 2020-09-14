import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';

const userProfileManagementRoutes: Routes = [
    { path: 'profile', component: UserProfileComponent },

];
export const UserProfileManagementRouting = RouterModule.forRoot(userProfileManagementRoutes);