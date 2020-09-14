import { Routes, RouterModule } from '@angular/router';
import { ListMaritalStatusManagementComponent } from './student-management-maritalstatus-list/student-management-maritalstatus-list.component';
import { AddMaritalStatusManagementComponent } from './student-management-maritalstatus-add/student-management-maritalstatus-add.component';
import { EditAndDetailMaritalStatusManagementComponent } from './student-management-maritalstatus-edit-detail/student-management-maritalstatus-edit-detail.component';

const MaritalStatusManagementRoutes: Routes = [
  {
    path: 'student/lookup/maritalstatus',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListMaritalStatusManagementComponent },
      { path: 'add', component: AddMaritalStatusManagementComponent },
      { path: ':id', component: EditAndDetailMaritalStatusManagementComponent }
    ]
  },

];
export const MaritalStatusManagementRouting = RouterModule.forRoot(MaritalStatusManagementRoutes);