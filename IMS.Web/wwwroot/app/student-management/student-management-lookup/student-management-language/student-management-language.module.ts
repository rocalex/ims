import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { LanguageManagementComponent } from './student-management-language.component';
import { ListLanguageManagementComponent } from './student-management-language-list/student-management-language-list.component';
import { AddLanguageManagementComponent } from './student-management-language-add/student-management-language-add.component';
import { EditAndDetailLanguageManagementComponent } from './student-management-language-edit-detail/student-management-language-edit-detail.component';
import { LanguageManagementService } from './student-management-language.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LanguageManagementComponent,
    ListLanguageManagementComponent,
    AddLanguageManagementComponent,
    EditAndDetailLanguageManagementComponent
  ],
  providers: [
    LanguageManagementService
  ],
})
export class LanguageManagementModule { }
