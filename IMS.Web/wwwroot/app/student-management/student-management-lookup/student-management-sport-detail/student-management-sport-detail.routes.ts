import { Routes, RouterModule } from '@angular/router';
import { ListSportDetailManagementComponent } from './student-management-sport-detail-list/student-management-sport-detail-list.component';
import { AddSportDetailManagementComponent } from './student-management-sport-detail-add/student-management-sport-detail-add.component';
import { EditAndDetailSportDetailManagementComponent } from './student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component';

const sportDetailManagementRoutes: Routes = [
  {
    path: 'student/lookup/sportdetail',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListSportDetailManagementComponent },
      { path: 'add', component: AddSportDetailManagementComponent },
      { path: ':id', component: EditAndDetailSportDetailManagementComponent }
    ]
  },

];
export const SportDetailManagementRouting = RouterModule.forRoot(sportDetailManagementRoutes);