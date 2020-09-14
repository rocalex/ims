import { Routes, RouterModule } from '@angular/router';
import { ListGenderManagementComponent } from './student-management-gender-list/student-management-gender-list.component';
import { AddGenderManagementComponent } from './student-management-gender-add/student-management-gender-add.component';
import { EditAndDetailGenderManagementComponent } from './student-management-gender-edit-detail/student-management-gender-edit-detail.component';

const genderManagementRoutes: Routes = [
  {
    path: 'student/lookup/gender',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListGenderManagementComponent },
      { path: 'add', component: AddGenderManagementComponent },
      { path: ':id', component: EditAndDetailGenderManagementComponent }
    ]
  },

];
export const GenderManagementRouting = RouterModule.forRoot(genderManagementRoutes);