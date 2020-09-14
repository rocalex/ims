import { Routes, RouterModule } from '@angular/router';
import { AutoSequenceManagementComponent } from './auto-sequence.component';

const autoSequenceManagementRoutes: Routes = [
  {
    path: 'administration/autosequence',
    children: [
      { path: '', component: AutoSequenceManagementComponent }
    ]
  },

];
export const AutoSequenceManagementRouting = RouterModule.forRoot(autoSequenceManagementRoutes);