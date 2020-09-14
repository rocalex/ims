import { Routes, RouterModule } from '@angular/router';

import { ListEventManagementComponent } from './event-management-info-list/event-management-info-list.component';
import { AddEventManagementComponent } from './event-management-info-add/event-management-info-add.component';
import { EditDetailEventManagementComponent } from './event-management-info-edit-detail/event-management-info-edit-detail.component';

const EventManagementRoutes: Routes = [
    {
        path: 'administration/event/info',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListEventManagementComponent },
            { path: 'add', component: AddEventManagementComponent },
            { path: ':id', component: EditDetailEventManagementComponent }
        ]
    },

];
export const EventManagementRouting = RouterModule.forRoot(EventManagementRoutes);