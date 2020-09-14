import { Routes, RouterModule } from '@angular/router';
import { ListReligionManagementComponent } from './student-management-religion-list/student-management-religion-list.component';
import { AddReligionManagementComponent } from './student-management-religion-add/student-management-religion-add.component';
import { EditAndDetailReligionManagementComponent } from './student-management-religion-edit-detail/student-management-religion-edit-detail.component';

const religionManagementRoutes: Routes = [
  {
    path: 'student/lookup/religion',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListReligionManagementComponent },
      { path: 'add', component: AddReligionManagementComponent },
      { path: ':id', component: EditAndDetailReligionManagementComponent }
    ]
  },

];
export const ReligionManagementRouting = RouterModule.forRoot(religionManagementRoutes);