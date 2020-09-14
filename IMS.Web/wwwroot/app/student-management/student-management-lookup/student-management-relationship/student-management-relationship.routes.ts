import { Routes, RouterModule } from '@angular/router';
import { ListRelationshipManagementComponent } from './student-management-relationship-list/student-management-relationship-list.component';
import { AddRelationshipManagementComponent } from './student-management-relationship-add/student-management-relationship-add.component';
import { EditAndDetailRelationshipManagementComponent } from './student-management-relationship-edit-detail/student-management-relationship-edit-detail.component';

const relationshipManagementRoutes: Routes = [
  {
    path: 'student/lookup/relationship',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListRelationshipManagementComponent },
      { path: 'add', component: AddRelationshipManagementComponent },
      { path: ':id', component: EditAndDetailRelationshipManagementComponent }
    ]
  },

];
export const RelationshipManagementRouting = RouterModule.forRoot(relationshipManagementRoutes);