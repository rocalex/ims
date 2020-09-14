import { Routes, RouterModule } from '@angular/router';
import { ListBloodGroupManagementComponent } from './student-management-blood-group-list/student-management-blood-group-list.component';
import { AddBloodGroupManagementComponent } from './student-management-blood-group-add/student-management-blood-group-add.component';
import { EditAndDetailBloodGroupManagementComponent } from './student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component';

const BloodGroupManagementRoutes: Routes = [
  {
    path: 'student/lookup/bloodgroup',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListBloodGroupManagementComponent },
      { path: 'add', component: AddBloodGroupManagementComponent },
      { path: ':id', component: EditAndDetailBloodGroupManagementComponent }
    ]
  },

];
export const BloodGroupManagementRouting = RouterModule.forRoot(BloodGroupManagementRoutes);