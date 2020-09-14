import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { GroupModel } from '../componentgroup.model';
import { ComponentGroupService } from '../componentgroup.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  groupList: GroupModel[] = [];
  constructor(
    private groupService: ComponentGroupService,
    private loaderService: LoaderService,
    private permissionService: PermissionService,
  ) { }

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList() {
    this.loaderService.toggleLoader(true);
    this.groupService.getComponentGroupsForLoggedInUser()
      .then(res => {
        this.groupList = res.json();
        this.loaderService.toggleLoader(false);
      }).catch(e => {
        this.loaderService.toggleLoader(false);
      });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
