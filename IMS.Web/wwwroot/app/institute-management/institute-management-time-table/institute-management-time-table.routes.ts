import { Routes, RouterModule } from '@angular/router';

// Components
import { TimeTableManagementComponent } from './institute-management-time-table.component';
import { GenerateTimeTableManagementComponent } from './institute-management-time-table-generate/institute-management-time-table-generate.component';

const timeTableManagementRoutes: Routes = [
    {
        path: 'institute/timetable',
        children: [
            { path: '', component: TimeTableManagementComponent },
            { path: 'generate/:classId/:sectionId', component: GenerateTimeTableManagementComponent }
        ]
    },

];
export const TimeTableManagementRouting = RouterModule.forRoot(timeTableManagementRoutes);