import { Routes, RouterModule } from '@angular/router';
import { ListStudentFeeManagementRefundComponent } from './student-fee-management-refund-list/student-fee-management-refund-list.component';
import { AddStudentFeeManagementRefundComponent } from './student-fee-management-refund-add/student-fee-management-refund-add.component';
import { EditAndDetailStudentFeeManagementRefundComponent } from './student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component';
import { PermissionAuthGuard } from '../../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

const studentFeeManagementRefundRoutes: Routes = [
  {
    path: 'student/feemanagement/refund',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: ListStudentFeeManagementRefundComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeRefund, type: 'View' }
      },
      {
        path: 'add', component: AddStudentFeeManagementRefundComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeRefund, type: 'Add' }
      },
      {
        path: ':id', component: EditAndDetailStudentFeeManagementRefundComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeRefund, type: 'Edit' }
      }
    ]
  },

];
export const StudentFeeManagementRefundRouting = RouterModule.forRoot(studentFeeManagementRefundRoutes);