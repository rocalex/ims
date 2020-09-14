import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { ExpenseModel } from '../expense.model';
import { ExpenseService } from '../expense.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  groupList: ExpenseModel[] = [];
  typeList: any[] = [
      { id: 0, label: "Expense" },
      { id: 1, label: "Income" }
  ];
  constructor(
    private groupService: ExpenseService,
    private loaderService: LoaderService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList() {
    this.loaderService.toggleLoader(true);
    this.groupService.getexpenseTypesForLoggedInUser()
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
