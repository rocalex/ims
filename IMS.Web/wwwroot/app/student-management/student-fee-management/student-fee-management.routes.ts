import { Routes, RouterModule } from '@angular/router';
import { StudentFeeManagementComponent } from './student-fee-management.component';

// Fee Component
import { ListFeeComponentManagementComponent } from './student-management-fee-component/student-management-fee-component-list/student-management-fee-component-list.component';
import { AddFeeComponentManagementComponent } from './student-management-fee-component/student-management-fee-component-add/student-management-fee-component-add.component';
import { EditDetailsFeeComponentManagementComponent } from './student-management-fee-component/student-management-fee-component-edit-details/student-management-fee-component-edit-details.component';

// Course Fee Terms
import { CourseFeeTermManagementComponent } from './student-management-course-fee-term/student-management-course-fee-term.component';
import { CourseFeeTermDetailsManagementComponent } from './student-management-course-fee-term/student-management-course-fee-term-details/student-management-course-fee-term-details.component';
import { ListStudentFeeManagementRefundComponent } from './student-fee-management-refund/student-fee-management-refund-list/student-fee-management-refund-list.component';
import { AddStudentFeeManagementRefundComponent } from './student-fee-management-refund/student-fee-management-refund-add/student-fee-management-refund-add.component';
import { EditAndDetailStudentFeeManagementRefundComponent } from './student-fee-management-refund/student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component';
import { StudentFeeManagementStudentFeeComponent } from './student-fee-management-studentfee/student-fee-management-studentfee.component';
import { AddStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt/student-fee-management-feereceipt-add/student-fee-management-feereceipt-add.component';
import { EditAndDetailStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt/student-fee-management-feereceipt-edit-detail/student-fee-management-feereceipt-edit-detail.component';
import { ListStudentFeeManagementFeeReceiptComponent } from './student-fee-management-feereceipt/student-fee-management-feereceipt-list/student-fee-management-feereceipt-list.component';
import { StudentFeeManagementReportListComponent } from './student-fee-management-report/student-fee-management-report-list/student-fee-management-report-list.component';
import { StudentFeeManagementReportViewComponent } from './student-fee-management-report/student-fee-management-report-view/student-fee-management-report-view.component';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

const studentFeeManagementRoutes: Routes = [
  {
    path: 'student/feemanagement', component: StudentFeeManagementComponent,
    children: [
      {
        path: 'component',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListFeeComponentManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeComponent, type: 'View' }
          },
          {
            path: 'add', component: AddFeeComponentManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeComponent, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsFeeComponentManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeComponent, type: 'Edit' }
          }
        ]
      },
      {
        path: 'coursefeeterms',
        children: [
          {
            path: '', component: CourseFeeTermManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentCourseFeeTerm, type: 'View' }
          },
          {
            path: ':classId', component: CourseFeeTermDetailsManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentCourseFeeTerm, type: 'Edit' }
          }
        ]
      },
      {
        path: 'refund',
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
      {
        path: 'studentfee', component: StudentFeeManagementStudentFeeComponent, canActivate: [PermissionAuthGuard],
        data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentStudentFee, type: 'View' }
      },
      {
        path: 'report',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: StudentFeeManagementReportListComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeReport, type: 'View' }
          },
          {
            path: ':id', component: StudentFeeManagementReportViewComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeReport, type: 'Edit' }
          }
        ]
      },
      {
        path: 'feereceipt',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStudentFeeManagementFeeReceiptComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'View' }
          },
          {
            path: 'add', component: AddStudentFeeManagementFeeReceiptComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailStudentFeeManagementFeeReceiptComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Student, child: UserGroupFeatureChildEnum.StudentFeeReceipt, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const StudentFeeManagementRouting = RouterModule.forRoot(studentFeeManagementRoutes);