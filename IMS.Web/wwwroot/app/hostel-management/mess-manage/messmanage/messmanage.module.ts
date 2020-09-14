import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MessmanageComponent } from './messmanage.component';
import { MessManageService } from './messmanage.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    MessmanageComponent
  ],
  providers: [
    forwardRef(() => MessManageService)
  ],
})
export class MessmanageModule { }
