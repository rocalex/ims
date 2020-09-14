import { Routes, RouterModule } from '@angular/router';
import { ListSubjectManagementComponent } from './institute-management-subject-list/institute-management-subject-list.component';
import { AddSubjectManagementComponent } from './institute-management-subject-add/institute-management-subject-add.component';
import { EditDetailsSubjectManagementComponent } from './institute-management-subject-edit-details/institute-management-subject-edit-details';

const subjectManagementRoutes: Routes = [
    {
        path: 'institute/subject',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ListSubjectManagementComponent },
          { path: 'add', component: AddSubjectManagementComponent },
          { path: ':id', component: EditDetailsSubjectManagementComponent }
        ]
    },

];
export const SubjectManagementRouting = RouterModule.forRoot(subjectManagementRoutes);