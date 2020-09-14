import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { ItemTypeModel } from '../itemtype.model';
import { ItemTypeService } from '../itemtype.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  addItemType: ItemTypeModel = new ItemTypeModel();
  issueBookId: number;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: SnackbarService,
    private apiService: ItemTypeService,
    private permissionService: PermissionService
    ) {
      this.activatedRoute.params.subscribe(param => { this.issueBookId = param.id });
  }

  ngOnInit() {
    this.getIssueBookById();
  }

  getIssueBookById() {
    this.loaderService.toggleLoader(true);
    this.apiService.getIssueBookById(this.issueBookId).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.addItemType = response;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['inventory', 'lookup', 'itemtype']);
      }
    this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.apiService.updateIssueBook(this.addItemType).then(res => {
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
