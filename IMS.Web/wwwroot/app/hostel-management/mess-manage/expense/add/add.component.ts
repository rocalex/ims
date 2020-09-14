import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../../shared/loader-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { ExpenseModel } from '../expense.model';
import { ExpenseService } from '../expense.service';

@Component({
  moduleId: module.id,
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  errorMessage: string = '';
  addExpense: ExpenseModel = new ExpenseModel();
  typeList: any[] = [
      { id: 0, label: "Expense" },
      { id: 1, label: "Income" }
  ];

  constructor(private loaderService: LoaderService,
    private permissionService: PermissionService,
    private groupService: ExpenseService,
    private snackBar: SnackbarService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.groupService.addexpenseType(this.addExpense).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'messmanagement', 'expensetype']);
      } else {
        this.errorMessage = response.message;
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}
