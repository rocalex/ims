import { Component, HostListener, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Sidenav, UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../shared/sidenav/sidenav.model';
import { LoaderService } from '../shared/loader-service';
import { PageTitleService } from '../shared/page-title';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  isSidenavExpanded: boolean = false;
  isSidenavExpandedDesktop: boolean = true;
  direction: string = 'ltr';
  loader = false;
  nav: Sidenav[] = [
    {
      bindName: 'Sidenav.Label.Administration', url: '/administration',
      parentId: UserGroupFeatureParentEnum.Administration,
      icon: 'zmdi zmdi-home',
      children: [
        //{ bindName: 'Sidenav.Children.EmailConfiguration',icon: 'zmdi zmdi-accounts-alt', url: '/administration/emailconfiguration', childId: UserGroupFeatureChildEnum.AcademicEmail },
        //{ bindName: 'Sidenav.Children.LookUp',icon: 'zmdi zmdi-accounts-alt', url: '/administration/lookup', childId: UserGroupFeatureChildEnum.AcademicLookUp },
        //{ bindName: 'Sidenav.Children.Templates',icon: 'zmdi zmdi-accounts-alt', url: '/administration/templates', childId: UserGroupFeatureChildEnum.AcademicTemplates },
        //{ bindName: 'Sidenav.Children.AutoSequence',icon: 'zmdi zmdi-accounts-alt', url: '/administration/autosequence', childId: UserGroupFeatureChildEnum.AcademicAutoSequence },
        //{ bindName: 'Sidenav.Children.EventManagement',icon: 'zmdi zmdi-accounts-alt', url: '/administration/event', childId: UserGroupFeatureChildEnum.AcademicEvent },
        { bindName: 'Sidenav.Children.UserManagement', icon: 'zmdi zmdi-accounts-alt', url: '/usermanagement', parentId: UserGroupFeatureParentEnum.Administration },
        { bindName: 'Sidenav.Children.Academic', icon: 'zmdi zmdi-city', url: '/academic', parentId: UserGroupFeatureParentEnum.Administration },
        { bindName: 'Sidenav.Children.Institute', icon: 'zmdi zmdi-city', url: '/institute', parentId: UserGroupFeatureParentEnum.Administration },
        { bindName: 'Sidenav.Children.Setting', icon: 'zmdi zmdi-settings', url: '/administration', parentId: UserGroupFeatureParentEnum.Administration }
      ]
    },
    //{
    //  bindName: 'Sidenav.Label.UserManagement',
    //  parentId: UserGroupFeatureParentEnum.Administration,
    //  icon: 'zmdi zmdi-account', url: '/usermanagement',
    //  children: [
    //    { bindName: 'Sidenav.Children.Role', icon: 'zmdi zmdi-accounts-alt', url: '/usermanagement/role', childId: UserGroupFeatureChildEnum.UserManagementRole },
    //    { bindName: 'Sidenav.Children.Permission', icon: 'zmdi zmdi-settings', url: '/usermanagement/permission', childId: UserGroupFeatureChildEnum.UserManagementPermission },
    //    { bindName: 'Sidenav.Children.Users', icon: 'zmdi zmdi-accounts', url: '/usermanagement/user', childId: UserGroupFeatureChildEnum.UserManagementUsers }
    //  ]
    //},
    //{
    //  bindName: 'Sidenav.Label.Academic', icon: 'zmdi zmdi-account', url: '/academic',
    //  parentId: UserGroupFeatureParentEnum.Academic,
    //  children: [
    //    { bindName: 'Sidenav.Children.Country', icon: 'zmdi zmdi-globe', url: '/academic/country', childId: UserGroupFeatureChildEnum.AcademicCountry },
    //    { bindName: 'Sidenav.Children.State', icon: 'zmdi zmdi-globe', url: '/academic/state', childId: UserGroupFeatureChildEnum.AcademicState },
    //    { bindName: 'Sidenav.Children.City', icon: 'zmdi zmdi-city', url: '/academic/city', childId: UserGroupFeatureChildEnum.AcademicCity },
    //    { bindName: 'Sidenav.Children.Currency', icon: 'zmdi zmdi-money', url: '/academic/currency', childId: UserGroupFeatureChildEnum.AcademicCurrency }
    //  ]
    //},
    {
      bindName: 'Sidenav.Label.Student', icon: 'zmdi zmdi-account', url: '/student',
      parentId: UserGroupFeatureParentEnum.Student,
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/student/dashboard', childId: UserGroupFeatureChildEnum.StudentDashboard },
        { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-face', url: '/student/lookup', childId: UserGroupFeatureChildEnum.StudentLookUp },
        { bindName: 'Sidenav.Children.Information', icon: 'zmdi zmdi-format-list-bulleted', url: '/student/information', childId: UserGroupFeatureChildEnum.StudentInfo },
        { bindName: 'Sidenav.Children.InActive', icon: 'zmdi zmdi-ticket-star', url: '/student/inactive', childId: UserGroupFeatureChildEnum.StudentInActive },
        { bindName: 'Sidenav.Children.Relieving', icon: 'zmdi zmdi-format-list-bulleted', url: '/student/relieving', childId: UserGroupFeatureChildEnum.StudentRelieving },
        { bindName: 'Sidenav.Children.Articles', icon: 'zmdi zmdi-wallpaper', url: '/student/articles', childId: UserGroupFeatureChildEnum.StudentArticles },
        { bindName: 'Sidenav.Children.Promotion', icon: 'zmdi zmdi-face', url: '/student/promotion', childId: UserGroupFeatureChildEnum.StudentPromotion },
        { bindName: 'Sidenav.Children.Attendance', icon: 'zmdi zmdi-assignment-check', url: '/student/attendance', childId: UserGroupFeatureChildEnum.StudentAttendance },
        { bindName: 'Sidenav.Children.FeeManagement', icon: 'zmdi zmdi-money', url: '/student/feemanagement', parentId: UserGroupFeatureParentEnum.Student },
        { bindName: 'Sidenav.Children.LeaveManagement', icon: 'zmdi zmdi-assignment-check', url: '/student/leavemanagement', childId: UserGroupFeatureChildEnum.StudentLeaveManagement },
        { bindName: 'Sidenav.Children.Report', icon: 'zmdi zmdi-view-dashboard', url: '/student/report', childId: UserGroupFeatureChildEnum.StudentReport }
      ]
    },
    //{
    //  bindName: 'Sidenav.Label.Institute', url: '/institute',
    //  parentId: UserGroupFeatureParentEnum.Administration,
    //  icon: 'zmdi zmdi-home',
    //  children: [
    //    { bindName: 'Sidenav.Children.AcademicYear', icon: 'zmdi zmdi-calendar', url: '/institute/academicyear', childId: UserGroupFeatureChildEnum.InstituteAcademicYear },
    //    { bindName: 'Sidenav.Children.WeekOff', icon: 'zmdi zmdi-calendar', url: '/institute/weekoff', childId: UserGroupFeatureChildEnum.InstituteWeekOff },
    //    { bindName: 'Sidenav.Children.HolidayOff', icon: 'zmdi zmdi-calendar', url: '/institute/holiday', childId: UserGroupFeatureChildEnum.InstituteHolidayOff },
    //    { bindName: 'Sidenav.Children.Class', icon: 'zmdi zmdi-graduation-cap', url: '/institute/class', childId: UserGroupFeatureChildEnum.InstituteClass },
    //    { bindName: 'Sidenav.Children.Subject', icon: 'zmdi zmdi-book', url: '/institute/subject', childId: UserGroupFeatureChildEnum.InstituteSubject },
    //    { bindName: 'Sidenav.Children.ClassSubjectMapping', icon: 'zmdi zmdi-arrow-split', url: '/institute/classsubject', childId: UserGroupFeatureChildEnum.InstituteClassSubjectMapping },
    //    { bindName: 'Sidenav.Children.TimeTable', icon: 'zmdi zmdi-time', url: '/institute/timetable', childId: UserGroupFeatureChildEnum.InstituteTimeTable }
    //  ]
    //},
    {
      bindName: 'Sidenav.Label.Staff', url: '/staff',
      parentId: UserGroupFeatureParentEnum.Staff,
      icon: 'zmdi zmdi-home',
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/staff/dashboard', childId: UserGroupFeatureChildEnum.StaffDashboard },
        { bindName: 'Sidenav.Children.Department', icon: 'zmdi zmdi-city-alt', url: '/staff/department', childId: UserGroupFeatureChildEnum.StaffDepartment },
        { bindName: 'Sidenav.Children.Designation', icon: 'zmdi zmdi-face', url: '/staff/designation', childId: UserGroupFeatureChildEnum.StaffDesignation },
        { bindName: 'Sidenav.Children.Master', icon: 'zmdi zmdi-check', url: '/staff/master', childId: UserGroupFeatureChildEnum.StaffInfo },
        { bindName: 'Sidenav.Children.Activities', icon: 'zmdi zmdi-check-all', url: '/staff/activities', parentId: UserGroupFeatureParentEnum.Staff },
        { bindName: 'Sidenav.Children.Planner', icon: 'zmdi zmdi-calendar', url: '/staff/planner', childId: UserGroupFeatureChildEnum.StaffPlanner },
        { bindName: 'Sidenav.Children.Attendance', icon: 'zmdi zmdi-assignment-check', url: '/staff/attendance', childId: UserGroupFeatureChildEnum.StaffAttendance },
        { bindName: 'Sidenav.Children.MarkManagement', icon: 'zmdi zmdi-assignment-check', url: '/student/mark', parentId: UserGroupFeatureParentEnum.Staff },
        { bindName: 'Sidenav.Children.LeaveManagement', icon: 'zmdi zmdi-assignment-check', url: '/staff/leavemanagement', childId: UserGroupFeatureChildEnum.StaffLeaveManagement },
        { bindName: 'Sidenav.Children.Report', icon: 'zmdi zmdi-view-dashboard', url: '/staff/report', childId: UserGroupFeatureChildEnum.StaffReport }
      ]
    },
    {
      bindName: 'Sidenav.Label.TransportManagement',
      icon: 'zmdi zmdi-car', url: '/transportmanagement',
      parentId: UserGroupFeatureParentEnum.Transportation,
      children: [
        { bindName: 'Sidenav.Children.VehicleMaster', icon: 'zmdi zmdi-car', url: '/transportmanagement/vehiclemaster', childId: UserGroupFeatureChildEnum.TransportVehicle },
        { bindName: 'Sidenav.Children.DriverMaster', icon: 'zmdi zmdi-car', url: '/transportmanagement/drivermaster', childId: UserGroupFeatureChildEnum.TransportDriver },
        { bindName: 'Sidenav.Children.VehicleDriverMapping', icon: 'zmdi zmdi-map', url: '/transportmanagement/vehicledrivermapping', childId: UserGroupFeatureChildEnum.TransportVehicleDriverMapping },
        { bindName: 'Sidenav.Children.Stage', icon: 'zmdi zmdi-library', url: '/transportmanagement/stage', childId: UserGroupFeatureChildEnum.TransportStage },
        { bindName: 'Sidenav.Children.Route', icon: 'zmdi zmdi-arrow-split', url: '/transportmanagement/route', childId: UserGroupFeatureChildEnum.TransportRoute },
        { bindName: 'Sidenav.Children.StudentRouteMapping', icon: 'zmdi zmdi-arrow-split', url: '/transportmanagement/studentroutemapping', childId: UserGroupFeatureChildEnum.TransportStudentRouteMapping },
        { bindName: 'Sidenav.Children.VehicleMaintenance', icon: 'zmdi zmdi-car-wash', url: '/transportmanagement/vehiclemaintenance', parentId: UserGroupFeatureParentEnum.Transportation }
      ]
    },
    {
      bindName: 'Sidenav.Label.Finance', url: '/finance',
      icon: 'zmdi zmdi-money', parentId: UserGroupFeatureParentEnum.Finance,
      children: [
        { bindName: 'Sidenav.Children.PaymentTypes', icon: 'zmdi zmdi-card', url: '/finance/paymenttypes', childId: UserGroupFeatureChildEnum.FinancePaymentType },
        { bindName: 'Sidenav.Children.ChartOfAccounts', icon: 'zmdi zmdi-chart', url: '/finance/chartofaccounts', childId: UserGroupFeatureChildEnum.FinanceChartOfPayment },
        { bindName: 'Sidenav.Children.GeneralReceipts', icon: 'zmdi zmdi-receipt', url: '/finance/receipt', childId: UserGroupFeatureChildEnum.FinanceBasicReciept },
        { bindName: 'Sidenav.Children.GeneralPayments', icon: 'zmdi zmdi-card', url: '/finance/payment', childId: UserGroupFeatureChildEnum.FinanceBasicPayment }
      ]
    },
    {
      bindName: 'Sidenav.Label.Hostel', url: '/hostel',
      icon: 'zmdi zmdi-hotel', parentId: UserGroupFeatureParentEnum.Finance,
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/hostel/dashboard', childId: UserGroupFeatureChildEnum.FinancePaymentType },
        { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-search-for', url: '/hostel/lookup', childId: UserGroupFeatureChildEnum.FinanceChartOfPayment },
        { bindName: 'Sidenav.Children.Hostel', icon: 'zmdi zmdi-view-dashboard', url: '/hostel/list', childId: UserGroupFeatureChildEnum.FinanceBasicReciept },
        { bindName: 'Sidenav.Children.Blocks', icon: 'zmdi zmdi-grid', url: '/hostel/blocks', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Floors', icon: 'zmdi zmdi-menu', url: '/hostel/floors', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.AllocateRoom', icon: 'zmdi zmdi-group', url: '/hostel/allocateroom', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.BedInfo', icon: 'zmdi zmdi-airline-seat-flat', url: '/hostel/bedinfo', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.VacantRoom', icon: 'zmdi zmdi-swap', url: '/hostel/vacantroom', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.MessManagement', icon: 'zmdi zmdi-city-alt', url: '/hostel/messmanagement', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/hostel/reports', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
      ]
    },
    {
      bindName: 'Sidenav.Label.Payroll', url: '/payroll',
      icon: 'zmdi zmdi-paypal', parentId: UserGroupFeatureParentEnum.Finance,
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/payroll/dashboard', childId: UserGroupFeatureChildEnum.FinancePaymentType },
        { bindName: 'Sidenav.Children.ComponentGroups', icon: 'zmdi zmdi-ungroup', url: '/payroll/componentgroup', childId: UserGroupFeatureChildEnum.FinanceChartOfPayment },
        { bindName: 'Sidenav.Children.Components', icon: 'zmdi zmdi-map', url: '/payroll/components', childId: UserGroupFeatureChildEnum.FinanceBasicReciept },
        { bindName: 'Sidenav.Children.EmployeeComponents', icon: 'zmdi zmdi-library', url: '/payroll/employeecomponents', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.TimeSheets', icon: 'zmdi zmdi-block', url: '/payroll/timesheets', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.GenPayroll', icon: 'zmdi zmdi-trending-up', url: '/payroll/genpayroll', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.DownloadPayslips', icon: 'zmdi zmdi-archive', url: '/payroll/downloadpayslips', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/payroll/reports', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
      ]
    },
    {
      bindName: 'Sidenav.Label.Inventory', url: '/inventory',
      icon: 'zmdi zmdi-bookmark', parentId: UserGroupFeatureParentEnum.Finance,
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/inventory/dashboard', childId: UserGroupFeatureChildEnum.FinancePaymentType },
        { bindName: 'Sidenav.Children.Location', icon: 'zmdi zmdi-pin', url: '/inventory/location', childId: UserGroupFeatureChildEnum.FinanceChartOfPayment },
        { bindName: 'Sidenav.Children.Branch', icon: 'zmdi zmdi-face', url: '/inventory/branch', childId: UserGroupFeatureChildEnum.FinanceBasicReciept },
        { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-search-for', url: '/inventory/lookup', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Item', icon: 'zmdi zmdi-hotel', url: '/inventory/item', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.PriceList', icon: 'zmdi zmdi-receipt', url: '/inventory/pricelist', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/inventory/reports', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Purchase', icon: 'zmdi zmdi-card', url: '/inventory/purchase', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.ScreensMenu', icon: 'zmdi zmdi-book', url: '/inventory/screensmenu', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
      ]
    },
    {
      bindName: 'Sidenav.Label.Library', url: '/library',
      icon: 'zmdi zmdi-library', parentId: UserGroupFeatureParentEnum.Finance,
      children: [
        { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/library/dashboard', childId: UserGroupFeatureChildEnum.FinancePaymentType },
        { bindName: 'Sidenav.Children.BookTypes', icon: 'zmdi zmdi-view-dashboard', url: '/library/booktypes', childId: UserGroupFeatureChildEnum.FinanceChartOfPayment },
        { bindName: 'Sidenav.Children.Books', icon: 'zmdi zmdi-book', url: '/library/books', childId: UserGroupFeatureChildEnum.FinanceBasicReciept },
        { bindName: 'Sidenav.Children.ExamPapers', icon: 'zmdi zmdi-file', url: '/library/exampapers', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.IssueBook', icon: 'zmdi zmdi-book', url: '/library/issuebook', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.ReturnBook', icon: 'zmdi zmdi-book', url: '/library/returnbook', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.SearchBook', icon: 'zmdi zmdi-card', url: '/library/searchbook', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
        { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/library/reports', childId: UserGroupFeatureChildEnum.FinanceBasicPayment },
      ]
    },

  ];
  institutes: any[] = [];
  selectedInstitute: any = {};
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  academicYears: any[] = [];
  selectedAcademicYear: any = {};

  constructor(private router: Router, private loaderService: LoaderService, private pageTitleService: PageTitleService,
    private translate: TranslateService, private appService: AppService, public dialog: MatDialog,
    private sharedService: SharedService) {
    this.router.events.subscribe((event: NavigationEnd) => {
      this.onWindowResize();
    });
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.loaderService.loader.subscribe(res => {
      setTimeout(() => {
        this.loader = res;
      }, 0);
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        var url = val.url.split('/');
        if (url.length >= 2) {
          var managementName = url[1];
          if (this.nav.length) {
            var name = this.nav.find(x => x.url.includes(managementName));
            if (name) {
              if (name.name) {
                this.pageTitleService.title = name.name;
              }
            }
          }
        }
      }
    });
    this.getInstitutesForLoggedInUser();
    this.changeLabel();
    this.sharedService.permission.subscribe(res => {
      var permissions = res;
      if (permissions.length) {
        this.loaderService.toggleLoader(true);
        for (var i = 0; i < this.nav.length; i++) {
          var navData = this.nav[i];
          for (var j = 0; j < navData.children.length; j++) {
            var child = navData.children[j];
            var data = permissions.find(x => x.userGroupFeatureParent === navData.parentId && x.userGroupFeatureChild === child.childId);
            if (data) {
              child.show = data.canView;
            } else {
              var childrens = permissions.filter(x => x.userGroupFeatureParent === navData.parentId);
              if (child.parentId === UserGroupFeatureParentEnum.Transportation) {
                childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.TransportVehicleMaintanence
                  || x.userGroupFeatureChild === UserGroupFeatureChildEnum.TransportVehicleRepair ||
                  x.userGroupFeatureChild === UserGroupFeatureChildEnum.TransportVehicleAccident ||
                  x.userGroupFeatureChild === UserGroupFeatureChildEnum.TransportVehicleBreakDown);
              } else if (child.parentId === UserGroupFeatureParentEnum.Staff) {
                childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.StaffActivity
                  || x.userGroupFeatureChild === UserGroupFeatureChildEnum.Homework
                  || x.userGroupFeatureChild === UserGroupFeatureChildEnum.Disciplinary);
              } else if (child.parentId === UserGroupFeatureParentEnum.Administration) {
                if (child.bindName === 'Sidenav.Children.UserManagement') {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.UserManagementRole
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.UserManagementPermission ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.UserManagementUsers);
                } else if (child.bindName === 'Sidenav.Children.Setting') {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicEmail
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicLookUp ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicTemplates
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicAutoSequence ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicEvent);
                } else if (child.bindName === 'Sidenav.Children.Institute') {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteAcademicYear
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteClass ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteClassSubjectMapping
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteHolidayOff ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteSubject
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteTimeTable ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.InstituteWeekOff);
                } else {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicCountry
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicState ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicCity ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.AcademicCurrency);
                }
              } else {
                if (child.bindName === 'Sidenav.Children.FeeManagement') {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentFeeComponent
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentCourseFeeTerm ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentFeeReceipt ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentFeeRefund ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentFeeReport ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentStudentFee);
                } else {
                  childrens = childrens.filter(x => x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentMarkClassExam
                    || x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentMarkExamDefinition ||
                    x.userGroupFeatureChild === UserGroupFeatureChildEnum.StudentMarkExamScoreEntry);
                }
              }
              var containTrue = (childrens.map(x => x.canView)).find(s => s === true);
              if (containTrue) {
                child.show = true;
              } else {
                child.show = false;
              }
            }
          }
          var childShow = navData.children.map(x => x.show);
          navData.show = childShow.find(x => x === true);
        }
        this.loaderService.toggleLoader(false);
      }
    });
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isSidenavExpanded = false;
    } else {
      this.isSidenavExpanded = this.isSidenavExpandedDesktop;
    }
  }

  toggleSidenav(value: any) {
    if (value != null && value != undefined) {
      this.isSidenavExpanded = value;
    } else {
      this.isSidenavExpanded = !this.isSidenavExpanded;
    }
    if (window.innerWidth > 767) {
      this.isSidenavExpandedDesktop = this.isSidenavExpanded;
    }
  }

  languageChange(event: string) {
    this.translate.use(event);
    setTimeout(() => {
      this.changeLabel();
    }, 0);
  }

  directionChange(value: string) {
    this.direction = value;
  }

  async changeLabel() {
    for (var i = 0; i < this.nav.length; i++) {
      var value = await this.translate.get(this.nav[i].bindName).toPromise();
      this.nav[i].name = value;
      if (this.nav[i].children) {
        for (var j = 0; j < this.nav[i].children.length; j++) {
          var childValue = await this.translate.get(this.nav[i].children[j].bindName).toPromise();
          this.nav[i].children[j].name = childValue;
        }
      }
    }
    var path = location.pathname.split('/');
    var managementName = path[1];
    if (this.nav.length) {
      var name = this.nav.find(x => x.url.includes(managementName));
      if (name) {
        if (name.name) {
          this.pageTitleService.title = name.name;
        }
      }
    }
  }

  getInstitutesForLoggedInUser() {
    this.loaderService.toggleLoader(true);
    this.appService.getInstitutesForLoggedInUser().then(res => {
      this.institutes = res.json();
      var anySelected = this.institutes.filter(x => x.isActive === true);
      if (!anySelected.length) {
        if (this.institutes.length === 1) {
          this.selectedInstitute = this.institutes[0];
          this.updateCurrentInstitute();
        } else {
          this.openModal();
        }
      } else {
        this.selectedInstitute = anySelected[0];
        this.getAcademicYears();
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateCurrentInstitute() {
    this.loaderService.toggleLoader(true);
    this.selectedInstitute = this.institutes.find(x => x.instituteId === this.selectedInstitute.instituteId);
    this.appService.updateCurrentInstitute(this.selectedInstitute.instituteId).then(res => {
      var response = res.json();
      if (response.message !== 'User institute mapping updated successfully') {
        location.href = '/Home/LogOut';
      }
      this.getAcademicYears();
      location.reload();
      this.loaderService.toggleLoader(false);
    })
  }

  openModal() {
    this.dialog.open(this.template, { width: '250px', disableClose: true });
  }

  closeModal(dialogRef: any) {
    this.updateCurrentInstitute();
    dialogRef.close();
  }

  instituteChange(institute: any) {
    this.selectedInstitute = institute;
    this.updateCurrentInstitute();
  }

  getAcademicYears() {
    this.loaderService.toggleLoader(true);
    this.appService.getAcademicYears()
      .then(res => {
        this.academicYears = res.json();
        this.appService.getSelectedAcademicYear().then(resData => {
          var response = resData.json();
          let currentAcademicYear: any = {};
          if (response) {
            this.sharedService.changeAcademicYear(response.academicYear);
          }
          this.sharedService.currentAcademicYear.subscribe(x => currentAcademicYear = x);
          if (currentAcademicYear === null || currentAcademicYear === undefined) {
            this.selectedAcademicYear = this.academicYears.filter(x => x.isActive)[0];
            this.sharedService.changeAcademicYear(this.selectedAcademicYear);
          }
          else {
            this.selectedAcademicYear = currentAcademicYear;
          }
          this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
          this.loaderService.toggleLoader(false);
        });
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  academicYearChange(academicYear: any) {
    this.selectedAcademicYear = academicYear;
    this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
    this.sharedService.changeAcademicYear(academicYear);
    location.reload();
  }

  addorUpdateSelectedAcademicYear(yearId: number) {
    this.loaderService.toggleLoader(true);
    this.appService.addorUpdateSelectedAcademicYear(yearId).then(res => {
      this.loaderService.toggleLoader(false);
    });
  }
}
