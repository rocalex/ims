import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

// Routes
import { TimeTableManagementRouting } from './institute-management-time-table.routes';

// Components
import { TimeTableManagementComponent } from './institute-management-time-table.component';
import { GenerateTimeTableManagementComponent } from './institute-management-time-table-generate/institute-management-time-table-generate.component';

// Services
import { TimeTableManagementService } from './institute-management-time-table.service';

@NgModule({
    imports: [
        SharedModule,
        //TimeTableManagementRouting
    ],
    declarations: [
        TimeTableManagementComponent,
        GenerateTimeTableManagementComponent
    ],
    providers: [
        TimeTableManagementService
    ],
})
export class TimeTableManagementModule { }
