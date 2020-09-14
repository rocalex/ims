import { Routes, RouterModule } from '@angular/router';
import { StudentManagementNotificationComponent } from './student-management-notification.component';

const studentManagementNotificationRoutes: Routes = [
    {
        path: 'student/notification',
        children: [
            { path: ':id', component: StudentManagementNotificationComponent }
        ]
    },

];
export const StudentManagementNotificationRouting = RouterModule.forRoot(studentManagementNotificationRoutes);