import { Routes, RouterModule } from '@angular/router';
import { ListLevelManagementComponent } from './student-management-level-list/student-management-level-list.component';
import { AddLevelManagementComponent } from './student-management-level-add/student-management-level-add.component';
import { EditAndDetailLevelManagementComponent } from './student-management-level-edit-detail/student-management-level-edit-detail.component';

const levelManagementRoutes: Routes = [
  {
    path: 'student/lookup/level',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListLevelManagementComponent },
      { path: 'add', component: AddLevelManagementComponent },
      { path: ':id', component: EditAndDetailLevelManagementComponent }
    ]
  },

];
export const LevelManagementRouting = RouterModule.forRoot(levelManagementRoutes);