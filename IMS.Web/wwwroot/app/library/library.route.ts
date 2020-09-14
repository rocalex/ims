import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'hostel',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

export const LibraryRouting = RouterModule.forRoot(routes);