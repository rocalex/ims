import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { TimesheetsSearchModel, AcademicYearModel, TimesheetModel } from './timesheets.model';
import { TimeSheetService } from './timesheets.service';
import { StaffModel } from '../../library/issuebook/issuebook.model';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  payrollTypeList: any[] = [
    { id: 1, name: "Daily" },
    { id: 2, name: "Monthly" }
  ];
  academicYearList: AcademicYearModel[] = [];
  teacherList: StaffModel[] = [];
  searchTimesheet: TimesheetsSearchModel = new TimesheetsSearchModel();
  isMonthType: boolean = false;
  isDailyType: boolean = false;
  isSearched: boolean = false;
  presentList: TimesheetModel[] = [];
  monthList: any[] = [
    { id: 1, name: "January" },
    { id: 2, name: "Febrary" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];
  presentTypeList: any[] = [
    { id: 0, name: "Absent" },
    { id: 1, name: "Full Day" },
    { id: 2, name: "Half Day" },
    { id: 3, name: "Leave" }
  ];
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: TimeSheetService,
    private snackService: SnackbarService
  ) { }

  ngOnInit() {
    this.getStaffList();
  }

  getStaffList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getStaffList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
        return;
      }
      this.teacherList = response;
      this.getAcademicList();
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  changePayrollType(value) {
    if (value == 1) {
      this.isDailyType = true;
      this.isMonthType = false;
    } else {
      this.isDailyType = false;
      this.isMonthType = true;
    }
  }

  changeTeacher(teacher: StaffModel) {
    this.searchTimesheet.teacher = teacher.id;
  }

  getAcademicList() {
    this.apiService.getAcademicList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
        return;
      }
      this.academicYearList = response;
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  fullName(staff: StaffModel) {
    return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
  }

  changePresentType(presentType: number) {
    for(var i=0; i<this.presentList.length; i++) {
      this.presentList[i].presenceType = presentType;
    }
  }

  save() {
    if(this.isDailyType) {
      this.loaderService.toggleLoader(true);
      this.apiService.saveTimesheetsByDate(this.presentList[0]).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackService.showSnackbar(response.message);
          return;
        }
        this.presentList = [];
        this.isSearched = false;
        this.loaderService.toggleLoader(false);
      }).catch(err => {
        this.loaderService.toggleLoader(false);
      });
    }
    if(this.isMonthType) {
      this.loaderService.toggleLoader(true);
      this.apiService.saveTimesheetByMonth(this.presentList).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackService.showSnackbar(response.message);
          return;
        }
        this.presentList = [];
        this.isSearched = false;
        this.loaderService.toggleLoader(false);
      }).catch(err => {
        this.loaderService.toggleLoader(false);
      });
    }
  }

  search() {
    this.isSearched = true;
    if (this.isDailyType) {
      this.loaderService.toggleLoader(true);
      this.apiService.getTimesheetsForStaffByDate(this.searchTimesheet.teacher, this.searchTimesheet.fromDate).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackService.showSnackbar(response.message);
          return;
        }
        this.presentList = [];
        this.presentList.push(response);
        this.loaderService.toggleLoader(false);
      }).catch(err => {
        this.loaderService.toggleLoader(false);
      });
    }
    if (this.isMonthType) {
      this.loaderService.toggleLoader(true);
      this.apiService.getTimesheetsForStaffByMonth(this.searchTimesheet.teacher, this.searchTimesheet.month).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackService.showSnackbar(response.message);
          return;
        }
        this.presentList = response;
        this.loaderService.toggleLoader(false);
      }).catch(err => {
        this.loaderService.toggleLoader(false);
      });
    }
  }
}
