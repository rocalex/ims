import { Routes, RouterModule } from '@angular/router';
import { ResourceFileManagementComponent } from './resource-file/resource-file.component';

const superAdminAppRoutes: Routes = [
  { path: '', redirectTo: 'institute', pathMatch: 'full' },
  { path: 'resourcefile', component: ResourceFileManagementComponent }

]; export const SuperAdminAppRouting = RouterModule.forRoot(superAdminAppRoutes);
