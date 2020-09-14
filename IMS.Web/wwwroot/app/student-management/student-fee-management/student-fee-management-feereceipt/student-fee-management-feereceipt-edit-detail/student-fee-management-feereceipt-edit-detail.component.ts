import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementFeeReceiptService } from '../student-fee-management-feereceipt.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-feereceipt-edit-detail.html'
})
export class EditAndDetailStudentFeeManagementFeeReceiptComponent implements OnInit {
  feeReceiptId: number;
  feeReceipt: any = {};
  receiptTypes: string[] = ['Cash', 'Cheque'];
  constructor(private studentFeeManagementFeeReceiptService: StudentFeeManagementFeeReceiptService,
    private loaderService: LoaderService, private router: Router, private snackBar: SnackbarService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.feeReceiptId = res.id);
    this.getFeeReceiptsById();
  }

  getFeeReceiptsById() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementFeeReceiptService.getFeeReceiptsById(this.feeReceiptId).then(res => {
      this.feeReceipt = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  updateFeeReceipt() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementFeeReceiptService.updateFeeReceipt(this.feeReceipt).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'feemanagement', 'feereceipt', 'list']);
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    });
  }

  calculation() {
    this.feeReceipt.total = this.feeReceipt.amount + this.feeReceipt.lateFee - this.feeReceipt.previousAmountPaid;
  }

  changeOnCheque(reciept: any) {
    if (reciept.receiptTypeDescription === 'Cash') {
      reciept.chequeDate = undefined;
      reciept.chequeNumber = undefined;
    }
  }
}
