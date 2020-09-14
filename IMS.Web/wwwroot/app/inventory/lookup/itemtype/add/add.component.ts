import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { ItemTypeModel } from '../itemtype.model';
import { ItemTypeService } from '../itemtype.service';

@Component({
  moduleId: module.id,
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  addItemType: ItemTypeModel = new ItemTypeModel();
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private snackbar: SnackbarService,
    private apiService: ItemTypeService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.apiService.addIssueBook(this.addItemType).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.router.navigate(['inventory', 'lookup', 'itemtype']);
      }
      else {
        this.snackbar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
