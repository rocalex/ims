import { Routes, RouterModule } from '@angular/router';
import { InstituteManagementListComponent } from './institute-management-list/institute-management-list.component';
import { InstituteManagementAddComponent } from './institute-management-add/institute-management-add.component';
import { InstituteManagementEditComponent } from './institute-management-edit/institute-management-edit.component';

const instituteManagementRoutes: Routes = [
  {
    path: 'institute',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: InstituteManagementListComponent },
      { path: 'add', component: InstituteManagementAddComponent },
      { path: ':id', component: InstituteManagementEditComponent }
    ]
  },

];
export const InstituteManagementRouting = RouterModule.forRoot(instituteManagementRoutes);