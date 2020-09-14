import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

// Routes
import { WeekOffManagementRouting } from './institute-management-week-off.routes';

// Components
import { WeekOffManagementComponent } from './institute-management-week-off.component';
import { ListEditWeekOffManagementComponent } from './institute-management-week-off-list-edit/institute-management-week-off-list-edit.component';

// Services
import { WeekOffManagementService } from './institute-management-week-off.service';

@NgModule({
    imports: [
        SharedModule,
        //WeekOffManagementRouting
    ],
    declarations: [
        WeekOffManagementComponent,
        ListEditWeekOffManagementComponent
    ],
    providers: [
        WeekOffManagementService
    ],
})
export class WeekOffManagementModule { }
