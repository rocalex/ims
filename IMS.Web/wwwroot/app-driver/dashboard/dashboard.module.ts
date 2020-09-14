import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardService } from './dashboard.service';
import { DriverDashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutes
    ],
    declarations: [
        DriverDashboardComponent
    ],
    providers: [
        DashboardService
    ],
})
export class DashboardModule { }
