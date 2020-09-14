import { Routes, RouterModule } from '@angular/router';

// Components
import { ListEditWeekOffManagementComponent } from './institute-management-week-off-list-edit/institute-management-week-off-list-edit.component';

const weekOffManagementRoutes: Routes = [
    {
        path: 'institute/weekoff',
        children: [
            { path: '', component: ListEditWeekOffManagementComponent }
        ]
    },

];
export const WeekOffManagementRouting = RouterModule.forRoot(weekOffManagementRoutes);