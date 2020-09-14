import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { IssueBookModel } from '../issuebook.model';
import { IssueBookService } from '../issuebook.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: IssueBookModel[] = [];
  userTypeList: any[] = [
    {
      id: 0,
      label: "Student",
    },
    {
      id: 1,
      label: "Staff"
    }
  ];
  statusList: any[] = [
    { id: 0, label: "Issued" },
    { id: 1, label: "Returned" }
  ]
  constructor(
    private loaderService: LoaderService,
    private snackbar: SnackbarService,
    private permissionService: PermissionService,
    private apiService: IssueBookService
    ) { }

  ngOnInit() {
    this.getIssueBookList();
  }

  getIssueBookList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getIssueBooksForLoggedInUser().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.list = response;
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

  delete(id: number) {
    this.apiService.deleteIssueBook(id).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.list = this.list.filter(x => x.id != id);
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
  
  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
