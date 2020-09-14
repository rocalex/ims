import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CountryManagementRouting } from './country-management.routes';
import { CountryManagementComponent } from './country-management.component';
import { AddCountryManagementComponent } from './country-management-add/country-management-add.component';
import { EditAndDetailCountryManagementComponent } from './country-management-edit-detail/country-management-edit-detail.component';
import { ListCountryManagementComponent } from './country-management-list/country-management-list.component';
import { CountryManagementService } from './country-management.service';

@NgModule({
  imports: [
    SharedModule,
    //CountryManagementRouting
  ],
  declarations: [
    CountryManagementComponent,
    AddCountryManagementComponent,
    EditAndDetailCountryManagementComponent,
    ListCountryManagementComponent
  ],
  providers: [
    CountryManagementService
  ],
})
export class CountryManagementModule { }
