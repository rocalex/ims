import { Routes, RouterModule } from '@angular/router';
import { ListQualificationManagementComponent } from './student-management-qualification-list/student-management-qualification-list.component';
import { AddQualificationManagementComponent } from './student-management-qualification-add/student-management-qualification-add.component';
import { EditAndDetailQualificationManagementComponent } from './student-management-qualification-edit-detail/student-management-qualification-edit-detail.component';

const qualificationManagementRoutes: Routes = [
  {
    path: 'student/lookup/qualification',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListQualificationManagementComponent },
      { path: 'add', component: AddQualificationManagementComponent },
      { path: ':id', component: EditAndDetailQualificationManagementComponent }
    ]
  },

];
export const QualificationManagementRouting = RouterModule.forRoot(qualificationManagementRoutes);