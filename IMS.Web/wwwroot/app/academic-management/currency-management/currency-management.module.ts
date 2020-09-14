import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ListCurrencyManagementComponent } from './currency-management-list/currency-management-list.component';
import { AddCurrencyManagementComponent } from './currency-management-add/currency-management-add.component';
import { EditAndDetailCurrencyManagementComponent } from './currency-management-edit-detail/currency-management-edit-detail.component';
import { CurrencyManagementRouting } from './currency-management.routes';
import { CurrencyManagementComponent } from './currency-management.component';
import { CurrencyManagementService } from './currency-management.service';

@NgModule({
  imports: [
    SharedModule,
    //CurrencyManagementRouting
  ],
  declarations: [
    CurrencyManagementComponent,
    AddCurrencyManagementComponent,
    EditAndDetailCurrencyManagementComponent,
    ListCurrencyManagementComponent
  ],
  providers: [
    CurrencyManagementService
  ],
})
export class CurrencyManagementModule { }
