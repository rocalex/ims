import { Routes, RouterModule } from '@angular/router';
import { HomeworkComponent } from './homework.component';

const homeworkRoutes: Routes = [
  { path: 'homework', component: HomeworkComponent },
];

export const HomeworkRoutes = RouterModule.forRoot(homeworkRoutes);
