import { Routes, RouterModule } from '@angular/router';
import { ListNationalityManagementComponent } from './student-management-nationality-list/student-management-nationality-list.component';
import { AddNationalityManagementComponent } from './student-management-nationality-add/student-management-nationality-add.component';
import { EditAndDetailNationalityManagementComponent } from './student-management-nationality-edit-detail/student-management-nationality-edit-detail.component';

const nationalityManagementRoutes: Routes = [
  {
    path: 'student/lookup/nationality',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListNationalityManagementComponent },
      { path: 'add', component: AddNationalityManagementComponent },
      { path: ':id', component: EditAndDetailNationalityManagementComponent }
    ]
  },

];
export const NationalityManagementRouting = RouterModule.forRoot(nationalityManagementRoutes);