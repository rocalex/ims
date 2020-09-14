import { Routes, RouterModule } from '@angular/router';

import { ListMotherTongueManagementComponent } from './student-management-mother-tongue-list/student-management-mother-tongue-list.component';
import { AddMotherTongueManagementComponent } from './student-management-mother-tongue-add/student-management-mother-tongue-add.component';
import { EditDetailsMotherTongueManagementComponent } from './student-management-mother-tongue-edit-details/student-management-mother-tongue-edit-details.component';

const motherTongueManagementRoutes: Routes = [
  {
    path: 'student/lookup/mothertongue',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListMotherTongueManagementComponent },
      { path: 'add', component: AddMotherTongueManagementComponent },
      { path: ':id', component: EditDetailsMotherTongueManagementComponent }
    ]
  },

];
export const MotherTongueManagementRouting = RouterModule.forRoot(motherTongueManagementRoutes);