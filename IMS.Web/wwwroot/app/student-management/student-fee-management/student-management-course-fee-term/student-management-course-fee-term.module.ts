import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { CourseFeeTermsManagementService } from './student-management-course-fee-term.service';

import { CourseFeeTermManagementComponent } from './student-management-course-fee-term.component';
import { CourseFeeTermDetailsManagementComponent } from './student-management-course-fee-term-details/student-management-course-fee-term-details.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CourseFeeTermManagementComponent,
        CourseFeeTermDetailsManagementComponent
    ],
    providers: [
        CourseFeeTermsManagementService
    ],
})
export class CourseFeeTermsManagementModule { }
