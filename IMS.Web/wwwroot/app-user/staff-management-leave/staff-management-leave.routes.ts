import { Routes, RouterModule } from '@angular/router';
import { ListStaffLeaveManagementComponent } from './staff-management-leave-list/staff-management-leave-list.component';
import { AddStaffLeaveManagementComponent } from './staff-management-leave-add/staff-management-leave-add.component';
import { EditAndDetailStaffLeaveManagementComponent } from './staff-management-leave-edit-detail/staff-management-leave-edit-detail.component';

const staffLeaveManagementRoutes: Routes = [
  {
    path: 'leavemanagement',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListStaffLeaveManagementComponent },
      { path: 'add', component: AddStaffLeaveManagementComponent },
      { path: ':id', component: EditAndDetailStaffLeaveManagementComponent }
    ]
  },

];
export const StaffLeaveManagementRouting = RouterModule.forRoot(staffLeaveManagementRoutes);