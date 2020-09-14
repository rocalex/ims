import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

// Routes
import { AcademicYearManagementRouting } from './institute-management-academic-year.routes';

// Components
import { AcademicYearManagementComponent } from './institute-management-academic-year.component';
import { ListAcademicYearManagementComponent } from './institute-management-academic-year-list/institute-management-academic-year-list.component';
import { AddAcademicYearManagementComponent } from './institute-management-academic-year-add/institute-management-academic-year-add.component';
import { EditDetailsAcademicYearManagementComponent } from './institute-management-academic-year-edit-details/institute-management-academic-year-edit-details';

// Services
import { AcademicYearManagementService } from './institute-management-academic-year.service';

@NgModule({
    imports: [
        SharedModule,
        //AcademicYearManagementRouting
    ],
    declarations: [
        AcademicYearManagementComponent,
        ListAcademicYearManagementComponent,
        AddAcademicYearManagementComponent,
        EditDetailsAcademicYearManagementComponent
    ],
    providers: [
        AcademicYearManagementService
    ],
})
export class AcademicYearManagementModule { }
