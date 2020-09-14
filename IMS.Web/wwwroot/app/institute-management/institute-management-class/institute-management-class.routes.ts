import { Routes, RouterModule } from '@angular/router';
import { ListClassManagementComponent } from './institute-management-class-list/institute-management-class-list.component';
import { AddClassManagementComponent } from './institute-management-class-add/institute-management-class-add.component';
import { EditDetailsClassManagementComponent } from './institute-management-class-edit-details/institute-management-class-edit-details';

const classManagementRoutes: Routes = [
    {
        path: 'institute/class',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ListClassManagementComponent },
          { path: 'add', component: AddClassManagementComponent },
          { path: ':id', component: EditDetailsClassManagementComponent }
        ]
    },

];
export const ClassManagementRouting = RouterModule.forRoot(classManagementRoutes);