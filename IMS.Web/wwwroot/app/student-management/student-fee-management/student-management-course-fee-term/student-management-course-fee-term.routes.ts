import { Routes, RouterModule } from '@angular/router';

import { CourseFeeTermManagementComponent } from './student-management-course-fee-term.component';
import { CourseFeeTermDetailsManagementComponent } from './student-management-course-fee-term-details/student-management-course-fee-term-details.component';

const CourseFeeTermManagementRoutes: Routes = [
    {
        path: 'student/feemanagement/coursefeeterms',
        children: [
            { path: '', component: CourseFeeTermManagementComponent },
            { path: ':classId', component: CourseFeeTermDetailsManagementComponent }
        ]
    },

];
export const CourseFeeTermManagementRouting = RouterModule.forRoot(CourseFeeTermManagementRoutes);