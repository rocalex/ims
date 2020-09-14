import { Routes, RouterModule } from '@angular/router';
import { AddStateManagementComponent } from './state-management-add/state-management-add.component';
import { EditAndDetailStateManagementComponent } from './state-management-edit-detail/state-management-edit-detail.component';
import { ListStateManagementComponent } from './state-management-list/state-management-list.component';

const stateManagementRoutes: Routes = [
  {
    path: 'academic/state',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListStateManagementComponent },
      { path: 'add', component: AddStateManagementComponent },
      { path: ':id', component: EditAndDetailStateManagementComponent }
    ]
  },

];
export const StateManagementRouting = RouterModule.forRoot(stateManagementRoutes);