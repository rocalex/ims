import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditDetailsComponent } from './user-edit-details/user-edit-details.component';

const userRoutes: Routes = [
    {
        path: 'usermanagement/user',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: UserListComponent },
            { path: 'add', component: UserAddComponent },
            { path: ':id', component: UserEditDetailsComponent }
        ]
    },
];
export const UserRouting = RouterModule.forRoot(userRoutes);