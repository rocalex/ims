import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementFeeReceiptService } from '../student-fee-management-feereceipt.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-feereceipt-list.html'
})
export class ListStudentFeeManagementFeeReceiptComponent implements OnInit {
  feeReceipts: any[] = [];
  constructor(private studentFeeManagementFeeReceiptService: StudentFeeManagementFeeReceiptService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllFeeReceipts();
  }

  getAllFeeReceipts() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementFeeReceiptService.getAllFeeReceipts().then(res => {
      this.feeReceipts = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentFeeReceipt, type);
  }
}
