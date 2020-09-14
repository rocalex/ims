import { Routes, RouterModule } from '@angular/router';
import { ListReligionCategoryManagementComponent } from './student-management-religion-category-list/student-management-religion-category-list.component';
import { AddReligionCategoryManagementComponent } from './student-management-religion-category-add/student-management-religion-category-add.component';
import { EditAndDetailReligionCategoryManagementComponent } from './student-management-religion-category-edit-detail/student-management-religion-category-edit.component';

const religionCategoryManagementRoutes: Routes = [
  {
    path: 'student/lookup/religioncategory',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListReligionCategoryManagementComponent },
      { path: 'add', component: AddReligionCategoryManagementComponent },
      { path: ':id', component: EditAndDetailReligionCategoryManagementComponent }
    ]
  },

];
export const ReligionCategoryManagementRouting = RouterModule.forRoot(religionCategoryManagementRoutes);