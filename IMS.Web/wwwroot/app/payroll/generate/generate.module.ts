import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { GenerateRouting } from './generate.route';
import { GenerateComponent } from './generate.component';

@NgModule({
  imports: [
    SharedModule,
    GenerateRouting
  ],
  declarations: [
    GenerateComponent,
  ],
  providers: [

  ]
})
export class GenerateModule {}