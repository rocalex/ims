import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeworkComponent } from './homework.component';
import { HomeworkService } from './homework.service';
import { HomeworkRoutes } from './homework.route';

@NgModule({
  imports: [
    SharedModule,
    HomeworkRoutes
  ],
  declarations: [
    HomeworkComponent
  ],
  providers: [
    HomeworkService
  ],
})
export class HomeworkModule { }
