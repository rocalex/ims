import { Routes, RouterModule } from '@angular/router';
import { PermissionAuthGuard } from '../../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { MessManageComponent } from './mess-manage.component';
import { MessmanageComponent } from './messmanage/messmanage.component';
import { DailyComponent } from './daily/daily.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { ListComponent } from './expense/list/list.component';
import { EditComponent } from './expense/edit/edit.component';
import { AddComponent } from './expense/add/add.component';

const routes: Routes = [
  {
    path: 'hostel/messmanagement', component: MessManageComponent,
    children: [
      {
        path: 'messmanage', component: MessmanageComponent
      },
      {
        path: 'expensetype', 
        children: [{
          path: '', component: ListComponent
        }, {
          path: 'add', component: AddComponent
        }, {
          path: ':id', component: EditComponent
        }]
      },
      {
        path: 'daily', component: DailyComponent
      },
      {
        path: 'expenditure', component: ExpenditureComponent
      }
    ]
  }
];
export const MessManageRouting = RouterModule.forRoot(routes);