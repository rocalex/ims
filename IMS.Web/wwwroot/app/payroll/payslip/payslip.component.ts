import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { SearchPayslipModel } from './payslip.model';

@Component({
  moduleId: module.id,
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  
  monthList: string[] = [];
  academicYearList: string[] = [];
  staffList: string[] = [];
  searchPayslip: SearchPayslipModel = new SearchPayslipModel();
  constructor(private loaderService: LoaderService, private permissionService: PermissionService) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
