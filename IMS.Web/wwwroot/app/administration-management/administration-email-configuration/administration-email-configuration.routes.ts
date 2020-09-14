import { Routes, RouterModule } from '@angular/router';

import { ListEmailConfigurationManagementComponent } from './administration-email-configuration-list/administration-email-configuration-list.component';
import { AddDepartmentManagementComponent } from './administration-email-configuration-add/administration-email-configuration-add.component';
import { EditDetailsDepartmentManagementComponent } from './administration-email-configuration-edit-details/administration-email-configuration-edit-details.component';

const emailConfigurationManagementRoutes: Routes = [
  {
    path: 'administration/emailconfiguration',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListEmailConfigurationManagementComponent },
      { path: 'add', component: AddDepartmentManagementComponent },
      { path: ':id', component: EditDetailsDepartmentManagementComponent }
    ]
  },

];
export const EmailConfigurationManagementRouting = RouterModule.forRoot(emailConfigurationManagementRoutes);