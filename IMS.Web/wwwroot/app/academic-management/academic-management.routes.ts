import { Routes, RouterModule } from '@angular/router';
import { AcademicManagementComponent } from './academic-management.component';
import { ListCityManagementComponent } from './city-management/city-management-list/city-management-list.component';
import { AddCityManagementComponent } from './city-management/city-management-add/city-management-add.component';
import { EditAndDetailCityManagementComponent } from './city-management/city-management-edit-detail/city-management-edit-detail.component';
import { ListCountryManagementComponent } from './country-management/country-management-list/country-management-list.component';
import { AddCountryManagementComponent } from './country-management/country-management-add/country-management-add.component';
import { EditAndDetailCountryManagementComponent } from './country-management/country-management-edit-detail/country-management-edit-detail.component';
import { ListCurrencyManagementComponent } from './currency-management/currency-management-list/currency-management-list.component';
import { AddCurrencyManagementComponent } from './currency-management/currency-management-add/currency-management-add.component';
import { EditAndDetailCurrencyManagementComponent } from './currency-management/currency-management-edit-detail/currency-management-edit-detail.component';
import { ListStateManagementComponent } from './state-management/state-management-list/state-management-list.component';
import { EditAndDetailStateManagementComponent } from './state-management/state-management-edit-detail/state-management-edit-detail.component';
import { AddStateManagementComponent } from './state-management/state-management-add/state-management-add.component';
import { PermissionAuthGuard } from '../../shared/permissions-route.guard';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';

const academicManagementRoutes: Routes = [
  {
    path: 'academic', component: AcademicManagementComponent,
    children: [
      {
        path: 'city',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListCityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCity, type: 'View' }
          },
          {
            path: 'add', component: AddCityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCity, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailCityManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCity, type: 'Edit' }
          }
        ]
      },
      {
        path: 'country',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListCountryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCountry, type: 'View' }
          },
          {
            path: 'add', component: AddCountryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCountry, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailCountryManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCountry, type: 'Edit' }
          }
        ]
      },
      {
        path: 'currency',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListCurrencyManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCurrency, type: 'View' }
          },
          {
            path: 'add', component: AddCurrencyManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCurrency, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailCurrencyManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicCurrency, type: 'Edit' }
          }
        ]
      },
      {
        path: 'state',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListStateManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicState, type: 'View' }
          },
          {
            path: 'add', component: AddStateManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicState, type: 'Add' }
          },
          {
            path: ':id', component: EditAndDetailStateManagementComponent, canActivate: [PermissionAuthGuard],
            data: { parent: UserGroupFeatureParentEnum.Administration, child: UserGroupFeatureChildEnum.AcademicState, type: 'Edit' }
          }
        ]
      }
    ]
  },

];
export const AcademicManagementRouting = RouterModule.forRoot(academicManagementRoutes);