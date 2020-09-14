import { Routes, RouterModule } from '@angular/router';
import { AddCityManagementComponent } from './city-management-add/city-management-add.component';
import { EditAndDetailCityManagementComponent } from './city-management-edit-detail/city-management-edit-detail.component';
import { ListCityManagementComponent } from './city-management-list/city-management-list.component';

const cityManagementRoutes: Routes = [
  {
    path: 'academic/city',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCityManagementComponent },
      { path: 'add', component: AddCityManagementComponent },
      { path: ':id', component: EditAndDetailCityManagementComponent }
    ]
  },

];
export const CityManagementRouting = RouterModule.forRoot(cityManagementRoutes);