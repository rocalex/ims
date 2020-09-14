import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch.component';

const routes: Routes = [
  {
    path: 'inventory/branch', component: BranchComponent
  }
];
export const BranchRouting = RouterModule.forRoot(routes);