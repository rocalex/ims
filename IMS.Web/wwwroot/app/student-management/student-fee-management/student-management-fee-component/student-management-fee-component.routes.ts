import { Routes, RouterModule } from '@angular/router';

import { ListFeeComponentManagementComponent } from './student-management-fee-component-list/student-management-fee-component-list.component';
import { AddFeeComponentManagementComponent } from './student-management-fee-component-add/student-management-fee-component-add.component';
import { EditDetailsFeeComponentManagementComponent } from './student-management-fee-component-edit-details/student-management-fee-component-edit-details.component';

const FeeComponentManagementRoutes: Routes = [
    {
        path: 'student/feemanagement/component',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListFeeComponentManagementComponent },
            { path: 'add', component: AddFeeComponentManagementComponent },
            { path: ':id', component: EditDetailsFeeComponentManagementComponent }
        ]
    },

];
export const FeeComponentManagementRouting = RouterModule.forRoot(FeeComponentManagementRoutes);