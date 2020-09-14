import { Routes, RouterModule } from '@angular/router';

import { ListClassSubjectMappingManagementComponent } from './institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component';

const classSubjectMappingManagementRoutes: Routes = [
    {
        path: 'institute/classsubject',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListClassSubjectMappingManagementComponent }
        ]
    },

];
export const ClassSubjectMappingManagementRouting = RouterModule.forRoot(classSubjectMappingManagementRoutes);