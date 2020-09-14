import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ResourceFileManagementComponent } from './resource-file.component';
import { ResourceFileManagementService } from './resource-file.service';
import { NgJsonEditorModule } from 'ang-jsoneditor';

@NgModule({
  imports: [
    SharedModule,
    NgJsonEditorModule
  ],
  declarations: [
    ResourceFileManagementComponent
  ],
  providers: [
    ResourceFileManagementService
  ],
})
export class ResourceFileManagementModule { }
