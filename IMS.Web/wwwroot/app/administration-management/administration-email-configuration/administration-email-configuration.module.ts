import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { EmailConfigurationManagementRouting } from './administration-email-configuration.routes';

import { AdministrationEmailConfigurationManagementComponent } from './administration-email-configuration.component';
import { ListEmailConfigurationManagementComponent } from './administration-email-configuration-list/administration-email-configuration-list.component';
import { AddDepartmentManagementComponent } from './administration-email-configuration-add/administration-email-configuration-add.component';
import { EditDetailsDepartmentManagementComponent } from './administration-email-configuration-edit-details/administration-email-configuration-edit-details.component';
import { EmailConfigurationManagementService } from './administration-email-configuration.service';

@NgModule({
    imports: [
        SharedModule,
        //EmailConfigurationManagementRouting
    ],
    declarations: [
        AdministrationEmailConfigurationManagementComponent,
        ListEmailConfigurationManagementComponent,
        AddDepartmentManagementComponent,
        EditDetailsDepartmentManagementComponent
    ],
    providers: [
        EmailConfigurationManagementService
    ],
})
export class EmailConfigurationManagementModule { }
