import { Routes, RouterModule } from '@angular/router';
import { AddCountryManagementComponent } from './country-management-add/country-management-add.component';
import { EditAndDetailCountryManagementComponent } from './country-management-edit-detail/country-management-edit-detail.component';
import { ListCountryManagementComponent } from './country-management-list/country-management-list.component';

const countryManagementRoutes: Routes = [
  {
    path: 'academic/country',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCountryManagementComponent },
      { path: 'add', component: AddCountryManagementComponent },
      { path: ':id', component: EditAndDetailCountryManagementComponent }
    ]
  },

];
export const CountryManagementRouting = RouterModule.forRoot(countryManagementRoutes);