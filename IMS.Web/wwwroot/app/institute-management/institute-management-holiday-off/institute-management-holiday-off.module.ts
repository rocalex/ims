import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

// Routes
import { HolidayOffManagementRouting } from './institute-management-holiday-off.routes';

// Components
import { HolidayOffManagementComponent } from './institute-management-holiday-off.component';
import { ListHolidayOffManagementComponent } from './institute-management-holiday-off-list/institute-management-holiday-off-list.component';
import { AddHolidayOffManagementComponent } from './institute-management-holiday-off-add/institute-management-holiday-off-add.component';
import { EditDetailsHolidayOffManagementComponent } from './institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component';

// Services
import { HolidayOffManagementService } from './institute-management-holiday-off.service';

@NgModule({
    imports: [
        SharedModule,
        //HolidayOffManagementRouting
    ],
    declarations: [
        HolidayOffManagementComponent,
        ListHolidayOffManagementComponent,
        AddHolidayOffManagementComponent,
        EditDetailsHolidayOffManagementComponent
    ],
    providers: [
        HolidayOffManagementService
    ],
})
export class HolidayOffManagementModule { }
