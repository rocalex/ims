import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { SearchPayslipModel } from './payslip.model';
import {HttpService} from "../../../core/http.service";

@Component({
  moduleId: module.id,
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {


  monthList: any[] = [
    { value: 1, viewValue: "January" },
    { value: 2, viewValue: "February" },
    { value: 3, viewValue: "March" },
    { value: 4, viewValue: "April" },
    { value: 5, viewValue: "May" },
    { value: 6, viewValue: "June" },
    { value: 7, viewValue: "July" },
    { value: 8, viewValue: "August" },
    { value: 9, viewValue: "September" },
    { value: 10, viewValue: "October" },
    { value: 11, viewValue: "November" },
    { value: 12, viewValue: "December" },
  ];
  
  academicYearList: any[] = [];
  staffList: any[] = [];
  searchPayslip: SearchPayslipModel = new SearchPayslipModel();
  constructor(private loaderService: LoaderService, private permissionService: PermissionService, private httpService: HttpService) { }
  
  ngOnInit() {
    this.getInitialData()
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.httpService.get('/api/instituteacademicyearmanagement').then(res => {
      this.academicYearList = res.json();
      this.loaderService.toggleLoader(false);
    })

    this.loaderService.toggleLoader(true);
    this.httpService.get('/api/staffmanagement').then(res => {
      this.staffList = res.json();
      this.loaderService.toggleLoader(false);
    })
  }
}
