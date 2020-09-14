import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TemplateManagementService } from './template-management.service';
import { TemplateManagementComponent } from './template-management.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        TemplateManagementComponent
    ],
    providers: [
        TemplateManagementService
    ],
})
export class TemplateManagementModule { }
