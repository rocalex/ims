import { Routes, RouterModule } from '@angular/router';

import { UserGroupManagementListComponent } from './user-group-management-list/user-group-management-list.component';
import { UserGroupManagementAddComponent } from './user-group-management-add/user-group-management-add.component';
import { UserGroupManagementEditDetailsComponent } from './user-group-management-edit-details/user-group-management-edit-details.component';

const userGroupManagementRoutes: Routes = [
    {
        path: 'usermanagement/role',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: UserGroupManagementListComponent },
            { path: 'add', component: UserGroupManagementAddComponent },
            { path: ':id', component: UserGroupManagementEditDetailsComponent }
        ]
    },
];
export const UserGroupManagementRouting = RouterModule.forRoot(userGroupManagementRoutes);