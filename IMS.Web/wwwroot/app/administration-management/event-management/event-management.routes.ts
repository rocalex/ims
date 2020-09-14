import { Routes, RouterModule } from '@angular/router';
import { EventManagementComponent } from './event-management.component';

// Event Info Management
import { ListEventManagementComponent } from './event-management-info/event-management-info-list/event-management-info-list.component';
import { AddEventManagementComponent } from './event-management-info/event-management-info-add/event-management-info-add.component';
import { EditDetailEventManagementComponent } from './event-management-info/event-management-info-edit-detail/event-management-info-edit-detail.component';

// Event Report
import { EventManagementReportComponent } from './event-management-report/event-management-report.component';

const eventManagementRoutes: Routes = [
    {
        path: 'administration/event', component: EventManagementComponent,
        children: [
            {
                path: 'info',
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListEventManagementComponent },
                    { path: 'add', component: AddEventManagementComponent },
                    { path: ':id', component: EditDetailEventManagementComponent }
                ]
            },
            {
                path: 'report',
                children: [
                    { path: '', component: EventManagementReportComponent }
                ]
            }
        ]
    },

];
export const EventManagementRoutes = RouterModule.forRoot(eventManagementRoutes);