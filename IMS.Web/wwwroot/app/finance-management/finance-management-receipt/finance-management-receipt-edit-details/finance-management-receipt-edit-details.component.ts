import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementReceiptService } from '../finance-management-receipt.service';

import { FinanceReceipts } from '../finance-management-receipt.model';

@Component({
  moduleId: module.id,
  templateUrl: 'finance-management-receipt-edit-details.html'
})
export class EditDetailsFinanceManagementReceiptComponent implements OnInit {

  financeReceiptId: number;
  financeReceipt: FinanceReceipts = new FinanceReceipts();
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
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(param => this.financeReceiptId = param.id);
  }

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
        this.financeReceipt.receivedBy = this.loggedInUserId;

        this.loaderService.toggleLoader(false);

        this.getFinanceReceiptData();
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  getFinanceReceiptData() {
    this.loaderService.toggleLoader(true);
    this.financeManagementReceiptService.getFinanceReceiptById(this.financeReceiptId)
      .then(res => {
        this.financeReceipt = res.json();
        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  checkWhiteSpace() {
    if (this.financeReceipt.code !== null && this.financeReceipt.code !== undefined && this.financeReceipt.code.trim() === '') {
      this.isEmptyCodeError = true;
    }
  }

  resetError() {
    if (this.financeReceipt.code !== null && this.financeReceipt.code !== undefined && this.financeReceipt.code.trim() !== '') {
      this.isEmptyCodeError = false;
    }
  }

  updateFinanceReceipt() {
    this.loaderService.toggleLoader(true);
    this.financeReceipt.receiptDate = this.convertDateToUtc(this.financeReceipt.receiptDate);
    this.financeManagementReceiptService.updateFinanceReceipt(this.financeReceipt)
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
