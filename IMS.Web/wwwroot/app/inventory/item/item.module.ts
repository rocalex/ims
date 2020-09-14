import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ItemComponent } from './item.component';
import { ItemRouting } from './item.route';
import { ItemService } from './item.service';

@NgModule({
  imports: [
    SharedModule,
    ItemRouting,
  ],
  declarations: [
      ItemComponent
  ],
  providers: [
    forwardRef(() => ItemService)
  ]
})
export class ItemModule {}