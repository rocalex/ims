import { Routes, RouterModule } from '@angular/router';

// Components
import { ListAcademicYearManagementComponent } from './institute-management-academic-year-list/institute-management-academic-year-list.component';
import { AddAcademicYearManagementComponent } from './institute-management-academic-year-add/institute-management-academic-year-add.component';
import { EditDetailsAcademicYearManagementComponent } from './institute-management-academic-year-edit-details/institute-management-academic-year-edit-details';

const academicYearManagementRoutes: Routes = [
    {
        path: 'institute/academicyear',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListAcademicYearManagementComponent },
            { path: 'add', component: AddAcademicYearManagementComponent },
            { path: ':id', component: EditDetailsAcademicYearManagementComponent }
        ]
    },

];
export const AcademicYearManagementRouting = RouterModule.forRoot(academicYearManagementRoutes);