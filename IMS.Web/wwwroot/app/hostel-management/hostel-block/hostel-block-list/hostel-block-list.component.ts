import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { BlockModel } from '../hostel-block.model';
import { HostelBlockService } from '../hostel-block.service';

@Component({
  moduleId: module.id,
  templateUrl: './hostel-block-list.component.html',
  styleUrls: ['./hostel-block-list.component.css']
})
export class HostelBlockListComponent implements OnInit {

  blockList: BlockModel[] = [];

  constructor(
    private loaderService: LoaderService,
    private snackBar: SnackbarService,
    private permissionService: PermissionService,
    private apiService: HostelBlockService
    ) { }

  ngOnInit() {
    this.getBlockList();
  }

  getBlockList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getBookTypesForLoggedInUser().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.blockList = response;
      }
      else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    })
    .catch((err) => {
      this.snackBar.showSnackbar(err.message);
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
