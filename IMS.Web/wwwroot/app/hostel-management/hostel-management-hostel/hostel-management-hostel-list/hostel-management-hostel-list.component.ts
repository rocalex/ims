import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { HostelModel } from '../hostel-management-hostel.model';
import { HostelManagementHostelService } from '../hostel-management-hostel.service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'hostel-management-hostel-list.html'
})
export class HostelManagementHostelListComponent implements OnInit {

  hostelList: HostelModel[] = [];

  hostelTypes: any[] = [
    {
      label: 'female',
      value: 0
    },
    {
      label: 'male',
      value: 1
    }];
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private snackService: SnackbarService,
    private apiService: HostelManagementHostelService
    ) { }

  ngOnInit() {
    this.getHostelList();
  }

  getHostelList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getHostelList().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.hostelList = response;
      } else {
        this.snackService.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
        this.snackService.showSnackbar("There is error on fetching hostel list");
        this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
