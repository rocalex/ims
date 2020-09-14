import { Routes, RouterModule } from '@angular/router';
import { AdministrationManagementComponent } from './administration.component';
import { ListEmailConfigurationManagementComponent } from './administration-email-configuration/administration-email-configuration-list/administration-email-configuration-list.component';
import { AddDepartmentManagementComponent } from './administration-email-configuration/administration-email-configuration-add/administration-email-configuration-add.component';
import { EditDetailsDepartmentManagementComponent } from '../staff-management/staff-management-department/staff-management-department-edit-details/staff-management-department-edit-details.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { AutoSequenceManagementComponent } from './auto-sequence/auto-sequence.component';
import { ListEventManagementComponent } from './event-management/event-management-info/event-management-info-list/event-management-info-list.component';
import { AddEventManagementComponent } from './event-management/event-management-info/event-management-info-add/event-management-info-add.component';
import { EditDetailEventManagementComponent } from './event-management/event-management-info/event-management-info-edit-detail/event-management-info-edit-detail.component';
import { EventManagementReportComponent } from './event-management/event-management-report/event-management-report.component';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';
import { PermissionAuthGuard } from '../../shared/permissions-route.guard';
import { TemplateManagementComponent } from './template-management/template-management.component';

const administrationManagementRoutes: Routes = [
  {
    path: 'administration', component: AdministrationManagementComponent,
    children: [
      {
        path: 'emailconfiguration',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListEmailConfigurationManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEmail, type: 'View' }
          },
          {
            path: 'add', component: AddDepartmentManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEmail, type: 'Add' }
          },
          {
            path: ':id', component: EditDetailsDepartmentManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEmail, type: 'Edit' }
          }
        ]
      },
      {
        path: 'event',
        children: [
          {
            path: '', component: EventManagementComponent,
            children: [
              {
                path: 'info',
                children: [
                  { path: '', redirectTo: 'list', pathMatch: 'full' },
                  {
                    path: 'list', component: ListEventManagementComponent, canActivate: [PermissionAuthGuard],
                    data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEvent, type: 'View' }
                  },
                  {
                    path: 'add', component: AddEventManagementComponent, canActivate: [PermissionAuthGuard],
                    data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEvent, type: 'Add' }
                  },
                  {
                    path: ':id', component: EditDetailEventManagementComponent, canActivate: [PermissionAuthGuard],
                    data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicEvent, type: 'Edit' }
                  }
                ]
              },
              {
                path: 'report',
                children: [
                  {
                    path: '', component: EventManagementReportComponent
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'autosequence',
        children: [
          {
            path: '', component: AutoSequenceManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicAutoSequence, type: 'View' }
          }
        ]
      },
      {
        path: 'templates',
        children: [
          {
            path: '', component: TemplateManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicTemplates, type: 'View' }
          },
        ]
      }
    ]
  },

];
export const AdministrationManagementRouting = RouterModule.forRoot(administrationManagementRoutes);