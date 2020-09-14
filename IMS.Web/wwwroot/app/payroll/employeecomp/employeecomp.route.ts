import { Routes, RouterModule } from '@angular/router';
import { EmployeeCompComponent } from './employeecomp.component';
import { MappingComponent } from './mapping/mapping.component';

const employeeRoutes: Routes = [
    {
        path: 'payroll/employeecomponents',
        children: [
            { path: '', component: EmployeeCompComponent },
            {
                path: 'mapping',
                children: [
                    { path: ':id', component: MappingComponent }
                ]
            }
        ]
    },

];
export const EmployeeCompRouting = RouterModule.forRoot(employeeRoutes);