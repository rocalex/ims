import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardService } from './dashboard.service';
import { AppUserDashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutes
    ],
    declarations: [
        AppUserDashboardComponent
    ],
    providers: [
        DashboardService
    ],
})
export class DashboardModule { }
