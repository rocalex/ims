import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LocationComponent } from './location.component';
import { LocationRouting } from './location.route';
import { LocationService } from './location.service';

@NgModule({
  imports: [
    SharedModule,
    LocationRouting,
  ],
  declarations: [
      LocationComponent
  ],
  providers: [
    forwardRef(() => LocationService)
  ]
})
export class LocationModule {}