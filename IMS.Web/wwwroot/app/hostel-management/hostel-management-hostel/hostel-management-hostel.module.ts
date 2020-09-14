import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HostelManagementHostelComponent } from './hostel-management-hostel.component';
import { HostelManagementHostelRouting } from './hostel-management-hostel.routes';
import { HostelManagementHostelListComponent } from './hostel-management-hostel-list/hostel-management-hostel-list.component';
import { HostelManagementHostelService } from './hostel-management-hostel.service';
import { HostelManagementAddHostelComponent } from './hostel-management-hostel-add/hostel-management-hostel-add.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  imports: [
    SharedModule,
    HostelManagementHostelRouting
  ],
  declarations: [
    HostelManagementHostelComponent,
    HostelManagementHostelListComponent,
    HostelManagementAddHostelComponent,
    EditComponent
  ],
  providers: [
    HostelManagementHostelService
  ],
})
export class HostelManagementHostelModule { }
