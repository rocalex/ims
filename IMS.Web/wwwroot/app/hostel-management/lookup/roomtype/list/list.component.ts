import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { RoomTypeModel } from '../../lookup.model';
import { LookupService } from '../../lookup.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html'
})
export class RoomTypeListComponent implements OnInit {

  roomTypes: RoomTypeModel[] = [];
  constructor(
    private groupService: LookupService,
    private loaderService: LoaderService,
    private permissionService: PermissionService,
  ) { }

  ngOnInit() {
    this.getroomTypes();
  }

  getroomTypes() {
    this.loaderService.toggleLoader(true);
    this.groupService.getRoomTypeForLoggedInUser()
      .then(res => {
        this.roomTypes = res.json();
        this.loaderService.toggleLoader(false);
      }).catch(e => {
        this.loaderService.toggleLoader(false);
      });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
