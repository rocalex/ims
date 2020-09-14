import { Routes, RouterModule } from '@angular/router';
import { ListStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-list/staff-management-disciplinary-list.component';
import { AddStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-add/staff-management-disciplinary-add.component';
import { EditAndDetailStaffDisciplinaryManagementComponent } from './staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component';

const disciplinaryRoutes: Routes = [
  {
    path: 'disciplinary',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListStaffDisciplinaryManagementComponent },
      { path: 'add', component: AddStaffDisciplinaryManagementComponent },
      { path: ':id', component: EditAndDetailStaffDisciplinaryManagementComponent }
    ]
  }
];

export const DisciplinaryRoutes = RouterModule.forRoot(disciplinaryRoutes);
