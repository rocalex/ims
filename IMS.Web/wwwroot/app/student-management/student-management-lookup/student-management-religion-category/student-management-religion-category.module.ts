import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReligionCategoryManagementRouting } from './student-management-religion-category.routes';
import { ReligionCategoryManagementComponent } from './student-management-religion-category.component';
import { ListReligionCategoryManagementComponent } from './student-management-religion-category-list/student-management-religion-category-list.component';
import { AddReligionCategoryManagementComponent } from './student-management-religion-category-add/student-management-religion-category-add.component';
import { EditAndDetailReligionCategoryManagementComponent } from './student-management-religion-category-edit-detail/student-management-religion-category-edit.component';
import { ReligionCategoryManagementService } from './student-management-religion-category.service';

@NgModule({
  imports: [
    SharedModule,
    //ReligionCategoryManagementRouting
  ],
  declarations: [
    ReligionCategoryManagementComponent,
    ListReligionCategoryManagementComponent,
    AddReligionCategoryManagementComponent,
    EditAndDetailReligionCategoryManagementComponent
  ],
  providers: [
    ReligionCategoryManagementService
  ],
})
export class ReligionCategoryManagementModule { }
