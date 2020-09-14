import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentPromotionManagementRouting } from './student-management-promotion.routes';
import { StudentPromotionManagementComponent } from './student-management-promotion.component';
import { ListStudentPromotionManagementComponent } from './student-management-promotion-list/student-management-promotion-list.component';
import { AddStudentPromotionManagementComponent } from './student-management-promotion-add/student-management-promotion-add.component';
import { EditAndDetailStudentPromotionManagementComponent } from './student-management-promotion-edit-detail/student-management-promotion-edit-detail.component';
import { StudentPromotionManagementService } from './student-management-promotion.service';

@NgModule({
  imports: [
    SharedModule,
    StudentPromotionManagementRouting
  ],
  declarations: [
    StudentPromotionManagementComponent,
    ListStudentPromotionManagementComponent,
    AddStudentPromotionManagementComponent,
    EditAndDetailStudentPromotionManagementComponent
  ],
  providers: [
    StudentPromotionManagementService
  ],
})
export class StudentPromotionManagementModule { }
