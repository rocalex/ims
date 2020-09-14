import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LookUpManagementRouting } from './look-up-management.routes';
import { LookUpManagementComponent } from './look-up-management.component';
import { AddLookUpManagementComponent } from './look-up-management-add/look-up-management-add.component';
import { ListLookUpManagementComponent } from './look-up-management-list/look-up-management-list.component';
import { EditAndDetailLookUpManagementComponent } from './look-up-management-edit-detail/look-up-management-edit-detail.component';
import { LookUpManagementService } from './look-up-management.service';

@NgModule({
    imports: [
        SharedModule,
        //LookUpManagementRouting
    ],
    declarations: [
        LookUpManagementComponent,
        AddLookUpManagementComponent,
        ListLookUpManagementComponent,
        EditAndDetailLookUpManagementComponent
    ],
    providers: [
        LookUpManagementService
    ],
})
export class LookUpManagementModule { }
