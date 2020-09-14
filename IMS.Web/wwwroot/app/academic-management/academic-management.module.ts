import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AcademicManagementRouting } from './academic-management.routes';
import { AcademicManagementComponent } from './academic-management.component';
import { CityManagementModule } from './city-management/city-management.module';
import { CountryManagementModule } from './country-management/country-management.module';
import { StateManagementModule } from './state-management/state-management.module';
import { CurrencyManagementModule } from './currency-management/currency-management.module';

@NgModule({
  imports: [
    SharedModule,
    AcademicManagementRouting,
    CityManagementModule,
    CountryManagementModule,
    StateManagementModule,
    CurrencyManagementModule
  ],
  declarations: [
    AcademicManagementComponent
  ],
  providers: [
  ],
})
export class AcademicManagementModule { }
