import { Routes, RouterModule } from '@angular/router';

// Components
import { ListHolidayOffManagementComponent } from './institute-management-holiday-off-list/institute-management-holiday-off-list.component';
import { AddHolidayOffManagementComponent } from './institute-management-holiday-off-add/institute-management-holiday-off-add.component';
import { EditDetailsHolidayOffManagementComponent } from './institute-management-holiday-off-edit-details/institute-management-holiday-off-edit-details.component';

const holidayOffManagementRoutes: Routes = [
    {
        path: 'institute/holiday',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListHolidayOffManagementComponent },
            { path: 'list/:academicyearid', component: ListHolidayOffManagementComponent },
            { path: 'add/:academicyearid', component: AddHolidayOffManagementComponent },
            { path: ':id', component: EditDetailsHolidayOffManagementComponent }
        ]
    },

];
export const HolidayOffManagementRouting = RouterModule.forRoot(holidayOffManagementRoutes);