import { Routes, RouterModule } from '@angular/router';

import { LookupComponent } from './lookup.component';
import { RoomTypeListComponent } from './roomtype/list/list.component';
import { RoomTypeAddComponent } from './roomtype/add/add.component';
import { RoomTypeEditComponent } from './roomtype/edit/edit.component';
import { BedStatusAddComponent } from './bedstatus/add/add.component';
import { BedStatusListComponent } from './bedstatus/list/list.component';
import { BedStatusEditComponent } from './bedstatus/edit/edit.component';

const lookupRoutes: Routes = [
  {
      path: 'hostel/lookup', component: LookupComponent,
      children: [
          {
            path: 'roomtype',
            children: [
              { path: '', component: RoomTypeListComponent },
              { path: 'add', component: RoomTypeAddComponent },
              { path: ':id', component: RoomTypeEditComponent }
            ]
          },
          {
            path: 'bedstatus',
            children: [
              { path: '', component: BedStatusListComponent },
              { path: 'add', component: BedStatusAddComponent },
              { path: ':id', component: BedStatusEditComponent }
            ]
          }
      ]
  },
];
export const LookupRouting = RouterModule.forRoot(lookupRoutes);