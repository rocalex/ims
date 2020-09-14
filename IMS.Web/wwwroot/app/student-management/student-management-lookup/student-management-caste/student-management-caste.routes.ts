import { Routes, RouterModule } from '@angular/router';
import { ListCasteManagementComponent } from './student-management-caste-list/student-management-caste-list.component';
import { AddCasteManagementComponent } from './student-management-caste-add/student-management-caste-add.component';
import { EditAndDetailCasteManagementComponent } from './student-management-caste-edit-detail/student-management-caste-edit-detail.component';

const casteManagementRoutes: Routes = [
  {
    path: 'student/lookup/caste',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCasteManagementComponent },
      { path: 'add', component: AddCasteManagementComponent },
      { path: ':id', component: EditAndDetailCasteManagementComponent }
    ]
  },

];
export const CasteManagementRouting = RouterModule.forRoot(casteManagementRoutes);