import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { FeeComponentManagementRouting } from './student-management-fee-component.routes';
import { FeeComponentManagementService } from './student-management-fee-component.service';

import { FeeComponentManagementComponent } from './student-management-fee-component.component';
import { ListFeeComponentManagementComponent } from './student-management-fee-component-list/student-management-fee-component-list.component';
import { AddFeeComponentManagementComponent } from './student-management-fee-component-add/student-management-fee-component-add.component';
import { EditDetailsFeeComponentManagementComponent } from './student-management-fee-component-edit-details/student-management-fee-component-edit-details.component';

@NgModule({
    imports: [
        SharedModule,
        //FeeComponentManagementRouting
    ],
    declarations: [
        FeeComponentManagementComponent,
        ListFeeComponentManagementComponent,
        AddFeeComponentManagementComponent,
        EditDetailsFeeComponentManagementComponent
    ],
    providers: [
        FeeComponentManagementService
    ],
})
export class FeeComponentManagementModule { }
