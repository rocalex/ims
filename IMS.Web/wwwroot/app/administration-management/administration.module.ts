import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AdministrationManagementRouting } from './administration.routes';

import { AdministrationManagementComponent } from './administration.component';
import { EmailConfigurationManagementModule } from './administration-email-configuration/administration-email-configuration.module';
//import { LookUpManagementModule } from './look-up-management/look-up-management.module';
import { TemplateManagementModule } from './template-management/template-management.module';
import { AutoSequenceManagementModule } from './auto-sequence/auto-sequence.module';
import { EventManagementModule } from './event-management/event-management.module';

@NgModule({
    imports: [
        SharedModule,
        AdministrationManagementRouting,
        EmailConfigurationManagementModule,
        //LookUpManagementModule,
        TemplateManagementModule,
        AutoSequenceManagementModule,
        EventManagementModule
    ],
    declarations: [
        AdministrationManagementComponent
    ],
    providers: [
    ],
})
export class AdministrationManagementModule { }
