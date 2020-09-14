import { Routes, RouterModule } from '@angular/router';
import { ListStudentPromotionManagementComponent } from './student-management-promotion-list/student-management-promotion-list.component';
import { AddStudentPromotionManagementComponent } from './student-management-promotion-add/student-management-promotion-add.component';
import { EditAndDetailStudentPromotionManagementComponent } from './student-management-promotion-edit-detail/student-management-promotion-edit-detail.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentPromotionManagementRoutes: Routes = [
  {
    path: 'student/promotion',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStudentPromotionManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentPromotion, type: 'View' }
      },
      {
        path: 'add', component: AddStudentPromotionManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentPromotion, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStudentPromotionManagementComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentPromotion, type: 'Edit' }
      }
    ]
  },

];
export const StudentPromotionManagementRouting = RouterModule.forRoot(studentPromotionManagementRoutes);