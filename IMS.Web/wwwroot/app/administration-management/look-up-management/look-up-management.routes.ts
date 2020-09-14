import { Routes, RouterModule } from '@angular/router';
import { ListLookUpManagementComponent } from './look-up-management-list/look-up-management-list.component';
import { AddLookUpManagementComponent } from './look-up-management-add/look-up-management-add.component';
import { EditAndDetailLookUpManagementComponent } from './look-up-management-edit-detail/look-up-management-edit-detail.component';

const lookUpManagementRoutes: Routes = [
    {
        path: 'administration/lookup',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListLookUpManagementComponent },
            { path: 'add', component: AddLookUpManagementComponent },
            { path: ':id', component: EditAndDetailLookUpManagementComponent }
        ]
    },

];
export const LookUpManagementRouting = RouterModule.forRoot(lookUpManagementRoutes);