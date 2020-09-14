import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CityManagementRouting } from './city-management.routes';
import { CityManagementComponent } from './city-management.component';
import { CityManagementService } from './city-management.service';
import { AddCityManagementComponent } from './city-management-add/city-management-add.component';
import { EditAndDetailCityManagementComponent } from './city-management-edit-detail/city-management-edit-detail.component';
import { ListCityManagementComponent } from './city-management-list/city-management-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    SharedModule,
      //CityManagementRouting,
      MatTableModule,
      MatPaginatorModule
     
  ],
  declarations: [
    CityManagementComponent,
    AddCityManagementComponent,
    EditAndDetailCityManagementComponent,
    ListCityManagementComponent
  ],
  providers: [
    CityManagementService
  ],
})
export class CityManagementModule { }
