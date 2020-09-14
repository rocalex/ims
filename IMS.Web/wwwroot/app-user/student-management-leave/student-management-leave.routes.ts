import { Routes, RouterModule } from '@angular/router';
import { ListStudentLeaveManagementComponent } from './student-management-leave-list/student-management-leave-list.component';
import { AddStudentLeaveManagementComponent } from './student-management-leave-add/student-management-leave-add.component';
import { EditAndDetailStudentLeaveManagementComponent } from './student-management-leave-edit-detail/student-management-leave-edit-detail.component';

const studentLeaveManagementRoutes: Routes = [
  {
    path: 'leave',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListStudentLeaveManagementComponent },
      { path: 'add', component: AddStudentLeaveManagementComponent },
      { path: ':id', component: EditAndDetailStudentLeaveManagementComponent }
    ]
  },

];
export const StudentLeaveManagementRouting = RouterModule.forRoot(studentLeaveManagementRoutes);