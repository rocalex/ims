import { Routes, RouterModule } from '@angular/router';

import { ListStaffActivityManagementComponent } from './staff-management-activity-list/staff-management-activity-list.component';
import { AddStaffActivityManagementComponent } from './staff-management-activity-add/staff-management-activity-add.component';
import { EditDetailsStaffActivityManagementComponent } from './staff-management-activity-edit-details/staff-management-activity-edit-details.component';

const staffActivityManagementRoutes: Routes = [
  {
    path: 'staff/activity',
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: ListStaffActivityManagementComponent },
        { path: 'add', component: AddStaffActivityManagementComponent },
        { path: ':id', component: EditDetailsStaffActivityManagementComponent }
    ]
  },

];
export const StaffActivityManagementRouting = RouterModule.forRoot(staffActivityManagementRoutes);