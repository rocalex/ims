import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementReceiptService } from '../finance-management-receipt.service';

import { FinanceReceipts } from '../finance-management-receipt.model';

@Component({
  moduleId: module.id,
  templateUrl: 'finance-management-receipt-add.html'
})
export class AddFinanceManagementReceiptComponent implements OnInit {

  addedFinanceReceipt: FinanceReceipts = new FinanceReceipts();
  incomeChartOfAccountsList: FinanceReceipts[] = [];
  systemUsersList: any[] = [];
  loggedInUserId: string;
  currentDate: Date = new Date();

  // Validations
  isEmptyCodeError: boolean = false;
  errorMessage: string = '';

  constructor(private loaderService: LoaderService,
    private snackbarService: SnackbarService,
    private financeManagementReceiptService: FinanceManagementReceiptService,
    private router: Router) { }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.financeManagementReceiptService.getFinanceReceiptCreationInitialData()
      .then(res => {
        let response = res.json();
        this.incomeChartOfAccountsList = response.incomeChartOfAccountsList;
        this.systemUsersList = response.systemUsersList;
        this.loggedInUserId = response.loggedInUserId;
        this.addedFinanceReceipt.receivedBy = this.loggedInUserId;

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  checkWhiteSpace() {
    if (this.addedFinanceReceipt.code !== null && this.addedFinanceReceipt.code !== undefined && this.addedFinanceReceipt.code.trim() === '') {
      this.isEmptyCodeError = true;
    }
  }

  resetError() {
    if (this.addedFinanceReceipt.code !== null && this.addedFinanceReceipt.code !== undefined && this.addedFinanceReceipt.code.trim() !== '') {
      this.isEmptyCodeError = false;
    }
  }

  addFinanceReceipt() {
    this.loaderService.toggleLoader(true);
    this.addedFinanceReceipt.receiptDate = this.convertDateToUtc(this.addedFinanceReceipt.receiptDate);
    this.financeManagementReceiptService.addNewFinanceReceipt(this.addedFinanceReceipt)
      .then(res => {
        let response = res.json();

        if (response.hasError === null || response.hasError === undefined || !response.hasError) {
          this.snackbarService.showSnackbar(response.message);
          this.router.navigate(['finance', 'receipt', 'list']);
        }
        else {
          this.errorMessage = response.message;
        }

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
