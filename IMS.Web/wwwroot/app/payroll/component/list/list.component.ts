import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { ComponentModel } from '../component.model';
import { ComponentService } from '../component.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  componentList: ComponentModel[] = [];
  errorMessage: string = '';
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private snackService: SnackbarService,
    private service: ComponentService
  ) { }

  ngOnInit() {
    this.getComponentList();
  }

  getComponentList() {
    this.loaderService.toggleLoader(true);
    this.service.getComponentsForLoggedInUser().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.componentList = response;
      } else {
        this.errorMessage = response.message;
        this.snackService.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
        this.snackService.showSnackbar("There is error on fetching component list");
        this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
