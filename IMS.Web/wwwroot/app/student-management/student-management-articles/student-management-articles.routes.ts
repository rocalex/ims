import { Routes, RouterModule } from '@angular/router';
import { StudentManagementArticlesComponent } from './student-management-articles.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentManagementArticlesRoutes: Routes = [
    {
        path: 'student/articles',
        children: [
          {
            path: '', component: StudentManagementArticlesComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentArticles, type: 'View' }
          }
        ]
    },

];
export const StudentManagementArticlesRouting = RouterModule.forRoot(studentManagementArticlesRoutes);