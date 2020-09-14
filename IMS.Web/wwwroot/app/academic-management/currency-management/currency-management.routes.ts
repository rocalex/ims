import { Routes, RouterModule } from '@angular/router';
import { ListCurrencyManagementComponent } from './currency-management-list/currency-management-list.component';
import { AddCurrencyManagementComponent } from './currency-management-add/currency-management-add.component';
import { EditAndDetailCurrencyManagementComponent } from './currency-management-edit-detail/currency-management-edit-detail.component';

const currencyManagementRoutes: Routes = [
  {
    path: 'academic/currency',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCurrencyManagementComponent },
      { path: 'add', component: AddCurrencyManagementComponent },
      { path: ':id', component: EditAndDetailCurrencyManagementComponent }
    ]
  },

];
export const CurrencyManagementRouting = RouterModule.forRoot(currencyManagementRoutes);