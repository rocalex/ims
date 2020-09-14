import { Routes, RouterModule } from '@angular/router';
import { TemplateManagementComponent } from './template-management.component';

const templateManagementRoutes: Routes = [
    {
        path: 'administration/templates',
    children: [
      { path: '', component: TemplateManagementComponent }
        ]
    },

];
export const TemplateManagementRouting = RouterModule.forRoot(templateManagementRoutes);