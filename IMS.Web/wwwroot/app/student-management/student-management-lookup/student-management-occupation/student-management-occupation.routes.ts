import { Routes, RouterModule } from '@angular/router';
import { ListOccupationManagementComponent } from './student-management-occupation-list/student-management-occupation-list.component';
import { AddOccupationManagementComponent } from './student-management-occupation-add/student-management-occupation-add.component';
import { EditAndDetailOccupationManagementComponent } from './student-management-occupation-edit-detail/student-management-occupation-edit-detail.component';

const occupationManagementRoutes: Routes = [
  {
    path: 'student/lookup/occupation',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListOccupationManagementComponent },
      { path: 'add', component: AddOccupationManagementComponent },
      { path: ':id', component: EditAndDetailOccupationManagementComponent }
    ]
  },

];
export const OccupationManagementRouting = RouterModule.forRoot(occupationManagementRoutes);