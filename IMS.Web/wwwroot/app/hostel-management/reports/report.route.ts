import { Routes, RouterModule } from '@angular/router';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { ReportComponent } from './report.component';
import { AllocateComponent } from './allocate/allocate.component';
import { MessManageComponent } from './messmanage/messmanage.component';

const routes: Routes = [
  {
    path: 'hostel/reports', component: ReportComponent,
    children: [
      {
        path: 'allocate', component: AllocateComponent
      },
      {
        path: 'messmanage', component: MessManageComponent
      }
    ]
  }
];
export const ReportRouting = RouterModule.forRoot(routes);