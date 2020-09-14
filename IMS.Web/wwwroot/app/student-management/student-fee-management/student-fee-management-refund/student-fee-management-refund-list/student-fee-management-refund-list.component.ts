import { Component, OnInit } from '@angular/core';
import { StudentFeeManagementRefundService } from '../student-fee-management-refund.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-fee-management-refund-list.html'
})
export class ListStudentFeeManagementRefundComponent implements OnInit {
  refunds: any[] = [];
  constructor(private studentFeeManagementRefundService: StudentFeeManagementRefundService, private loaderService: LoaderService,
    private permissionService: PermissionService) { }

  ngOnInit() {
    this.getAllFeeRefunds();
  }

  getAllFeeRefunds() {
    this.loaderService.toggleLoader(true);
    this.studentFeeManagementRefundService.getAllFeeRefunds().then(res => {
      this.refunds = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentFeeRefund, type);
  }
}
