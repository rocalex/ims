"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sidenav_model_1 = require("../shared/sidenav/sidenav.model");
const loader_service_1 = require("../shared/loader-service");
const page_title_1 = require("../shared/page-title");
const core_2 = require("@ngx-translate/core");
const app_service_1 = require("./app.service");
const material_1 = require("@angular/material");
const shared_service_1 = require("../shared/shared.service");
let AppComponent = class AppComponent {
    constructor(router, loaderService, pageTitleService, translate, appService, dialog, sharedService) {
        this.router = router;
        this.loaderService = loaderService;
        this.pageTitleService = pageTitleService;
        this.translate = translate;
        this.appService = appService;
        this.dialog = dialog;
        this.sharedService = sharedService;
        this.isSidenavExpanded = false;
        this.isSidenavExpandedDesktop = true;
        this.direction = 'ltr';
        this.loader = false;
        this.nav = [
            {
                bindName: 'Sidenav.Label.Administration', url: '/administration',
                parentId: sidenav_model_1.UserGroupFeatureParentEnum.Administration,
                icon: 'zmdi zmdi-home',
                children: [
                    //{ bindName: 'Sidenav.Children.EmailConfiguration',icon: 'zmdi zmdi-accounts-alt', url: '/administration/emailconfiguration', childId: UserGroupFeatureChildEnum.AcademicEmail },
                    //{ bindName: 'Sidenav.Children.LookUp',icon: 'zmdi zmdi-accounts-alt', url: '/administration/lookup', childId: UserGroupFeatureChildEnum.AcademicLookUp },
                    //{ bindName: 'Sidenav.Children.Templates',icon: 'zmdi zmdi-accounts-alt', url: '/administration/templates', childId: UserGroupFeatureChildEnum.AcademicTemplates },
                    //{ bindName: 'Sidenav.Children.AutoSequence',icon: 'zmdi zmdi-accounts-alt', url: '/administration/autosequence', childId: UserGroupFeatureChildEnum.AcademicAutoSequence },
                    //{ bindName: 'Sidenav.Children.EventManagement',icon: 'zmdi zmdi-accounts-alt', url: '/administration/event', childId: UserGroupFeatureChildEnum.AcademicEvent },
                    { bindName: 'Sidenav.Children.UserManagement', icon: 'zmdi zmdi-accounts-alt', url: '/usermanagement', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Administration },
                    { bindName: 'Sidenav.Children.Academic', icon: 'zmdi zmdi-city', url: '/academic', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Administration },
                    { bindName: 'Sidenav.Children.Institute', icon: 'zmdi zmdi-city', url: '/institute', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Administration },
                    { bindName: 'Sidenav.Children.Setting', icon: 'zmdi zmdi-settings', url: '/administration', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Administration }
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
                parentId: sidenav_model_1.UserGroupFeatureParentEnum.Student,
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/student/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard },
                    { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-face', url: '/student/lookup', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp },
                    { bindName: 'Sidenav.Children.Information', icon: 'zmdi zmdi-format-list-bulleted', url: '/student/information', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo },
                    { bindName: 'Sidenav.Children.InActive', icon: 'zmdi zmdi-ticket-star', url: '/student/inactive', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentInActive },
                    { bindName: 'Sidenav.Children.Relieving', icon: 'zmdi zmdi-format-list-bulleted', url: '/student/relieving', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentRelieving },
                    { bindName: 'Sidenav.Children.Articles', icon: 'zmdi zmdi-wallpaper', url: '/student/articles', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentArticles },
                    { bindName: 'Sidenav.Children.Promotion', icon: 'zmdi zmdi-face', url: '/student/promotion', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentPromotion },
                    { bindName: 'Sidenav.Children.Attendance', icon: 'zmdi zmdi-assignment-check', url: '/student/attendance', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentAttendance },
                    { bindName: 'Sidenav.Children.FeeManagement', icon: 'zmdi zmdi-money', url: '/student/feemanagement', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Student },
                    { bindName: 'Sidenav.Children.LeaveManagement', icon: 'zmdi zmdi-assignment-check', url: '/student/leavemanagement', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentLeaveManagement },
                    { bindName: 'Sidenav.Children.Report', icon: 'zmdi zmdi-view-dashboard', url: '/student/report', childId: sidenav_model_1.UserGroupFeatureChildEnum.StudentReport }
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
                parentId: sidenav_model_1.UserGroupFeatureParentEnum.Staff,
                icon: 'zmdi zmdi-home',
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/staff/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffDashboard },
                    { bindName: 'Sidenav.Children.Department', icon: 'zmdi zmdi-city-alt', url: '/staff/department', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffDepartment },
                    { bindName: 'Sidenav.Children.Designation', icon: 'zmdi zmdi-face', url: '/staff/designation', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffDesignation },
                    { bindName: 'Sidenav.Children.Master', icon: 'zmdi zmdi-check', url: '/staff/master', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffInfo },
                    { bindName: 'Sidenav.Children.Activities', icon: 'zmdi zmdi-check-all', url: '/staff/activities', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Staff },
                    { bindName: 'Sidenav.Children.Planner', icon: 'zmdi zmdi-calendar', url: '/staff/planner', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffPlanner },
                    { bindName: 'Sidenav.Children.Attendance', icon: 'zmdi zmdi-assignment-check', url: '/staff/attendance', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffAttendance },
                    { bindName: 'Sidenav.Children.MarkManagement', icon: 'zmdi zmdi-assignment-check', url: '/student/mark', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Staff },
                    { bindName: 'Sidenav.Children.LeaveManagement', icon: 'zmdi zmdi-assignment-check', url: '/staff/leavemanagement', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffLeaveManagement },
                    { bindName: 'Sidenav.Children.Report', icon: 'zmdi zmdi-view-dashboard', url: '/staff/report', childId: sidenav_model_1.UserGroupFeatureChildEnum.StaffReport }
                ]
            },
            {
                bindName: 'Sidenav.Label.TransportManagement',
                icon: 'zmdi zmdi-car', url: '/transportmanagement',
                parentId: sidenav_model_1.UserGroupFeatureParentEnum.Transportation,
                children: [
                    { bindName: 'Sidenav.Children.VehicleMaster', icon: 'zmdi zmdi-car', url: '/transportmanagement/vehiclemaster', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicle },
                    { bindName: 'Sidenav.Children.DriverMaster', icon: 'zmdi zmdi-car', url: '/transportmanagement/drivermaster', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportDriver },
                    { bindName: 'Sidenav.Children.VehicleDriverMapping', icon: 'zmdi zmdi-map', url: '/transportmanagement/vehicledrivermapping', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleDriverMapping },
                    { bindName: 'Sidenav.Children.Stage', icon: 'zmdi zmdi-library', url: '/transportmanagement/stage', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportStage },
                    { bindName: 'Sidenav.Children.Route', icon: 'zmdi zmdi-arrow-split', url: '/transportmanagement/route', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportRoute },
                    { bindName: 'Sidenav.Children.StudentRouteMapping', icon: 'zmdi zmdi-arrow-split', url: '/transportmanagement/studentroutemapping', childId: sidenav_model_1.UserGroupFeatureChildEnum.TransportStudentRouteMapping },
                    { bindName: 'Sidenav.Children.VehicleMaintenance', icon: 'zmdi zmdi-car-wash', url: '/transportmanagement/vehiclemaintenance', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Transportation }
                ]
            },
            {
                bindName: 'Sidenav.Label.Finance', url: '/finance',
                icon: 'zmdi zmdi-money', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Finance,
                children: [
                    { bindName: 'Sidenav.Children.PaymentTypes', icon: 'zmdi zmdi-card', url: '/finance/paymenttypes', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType },
                    { bindName: 'Sidenav.Children.ChartOfAccounts', icon: 'zmdi zmdi-chart', url: '/finance/chartofaccounts', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment },
                    { bindName: 'Sidenav.Children.GeneralReceipts', icon: 'zmdi zmdi-receipt', url: '/finance/receipt', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept },
                    { bindName: 'Sidenav.Children.GeneralPayments', icon: 'zmdi zmdi-card', url: '/finance/payment', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment }
                ]
            },
            {
                bindName: 'Sidenav.Label.Hostel', url: '/hostel',
                icon: 'zmdi zmdi-hotel', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Finance,
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/hostel/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType },
                    { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-search-for', url: '/hostel/lookup', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment },
                    { bindName: 'Sidenav.Children.Hostel', icon: 'zmdi zmdi-view-dashboard', url: '/hostel/list', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept },
                    { bindName: 'Sidenav.Children.Blocks', icon: 'zmdi zmdi-grid', url: '/hostel/blocks', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Floors', icon: 'zmdi zmdi-menu', url: '/hostel/floors', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.AllocateRoom', icon: 'zmdi zmdi-group', url: '/hostel/allocateroom', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.BedInfo', icon: 'zmdi zmdi-airline-seat-flat', url: '/hostel/bedinfo', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.VacantRoom', icon: 'zmdi zmdi-swap', url: '/hostel/vacantroom', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.MessManagement', icon: 'zmdi zmdi-city-alt', url: '/hostel/messmanagement', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/hostel/reports', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                ]
            },
            {
                bindName: 'Sidenav.Label.Payroll', url: '/payroll',
                icon: 'zmdi zmdi-paypal', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Finance,
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/payroll/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType },
                    { bindName: 'Sidenav.Children.ComponentGroups', icon: 'zmdi zmdi-ungroup', url: '/payroll/componentgroup', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment },
                    { bindName: 'Sidenav.Children.Components', icon: 'zmdi zmdi-map', url: '/payroll/components', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept },
                    { bindName: 'Sidenav.Children.EmployeeComponents', icon: 'zmdi zmdi-library', url: '/payroll/employeecomponents', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.TimeSheets', icon: 'zmdi zmdi-block', url: '/payroll/timesheets', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.GenPayroll', icon: 'zmdi zmdi-trending-up', url: '/payroll/genpayroll', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.DownloadPayslips', icon: 'zmdi zmdi-archive', url: '/payroll/downloadpayslips', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/payroll/reports', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                ]
            },
            {
                bindName: 'Sidenav.Label.Inventory', url: '/inventory',
                icon: 'zmdi zmdi-bookmark', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Finance,
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/inventory/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType },
                    { bindName: 'Sidenav.Children.Location', icon: 'zmdi zmdi-pin', url: '/inventory/location', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment },
                    { bindName: 'Sidenav.Children.Branch', icon: 'zmdi zmdi-face', url: '/inventory/branch', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept },
                    { bindName: 'Sidenav.Children.LookUp', icon: 'zmdi zmdi-search-for', url: '/inventory/lookup', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Item', icon: 'zmdi zmdi-hotel', url: '/inventory/item', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.PriceList', icon: 'zmdi zmdi-receipt', url: '/inventory/pricelist', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/inventory/reports', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Purchase', icon: 'zmdi zmdi-card', url: '/inventory/purchase', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.ScreensMenu', icon: 'zmdi zmdi-book', url: '/inventory/screensmenu', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                ]
            },
            {
                bindName: 'Sidenav.Label.Library', url: '/library',
                icon: 'zmdi zmdi-library', parentId: sidenav_model_1.UserGroupFeatureParentEnum.Finance,
                children: [
                    { bindName: 'Sidenav.Children.Dashboard', icon: 'zmdi zmdi-view-dashboard', url: '/library/dashboard', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinancePaymentType },
                    { bindName: 'Sidenav.Children.BookTypes', icon: 'zmdi zmdi-view-dashboard', url: '/library/booktypes', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment },
                    { bindName: 'Sidenav.Children.Books', icon: 'zmdi zmdi-book', url: '/library/books', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept },
                    { bindName: 'Sidenav.Children.ExamPapers', icon: 'zmdi zmdi-file', url: '/library/exampapers', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.IssueBook', icon: 'zmdi zmdi-book', url: '/library/issuebook', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.ReturnBook', icon: 'zmdi zmdi-book', url: '/library/returnbook', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.SearchBook', icon: 'zmdi zmdi-card', url: '/library/searchbook', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                    { bindName: 'Sidenav.Children.Reports', icon: 'zmdi zmdi-file-text', url: '/library/reports', childId: sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicPayment },
                ]
            },
        ];
        this.institutes = [];
        this.selectedInstitute = {};
        this.academicYears = [];
        this.selectedAcademicYear = {};
        this.router.events.subscribe((event) => {
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
            if (val instanceof router_1.NavigationEnd) {
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
                        }
                        else {
                            var childrens = permissions.filter(x => x.userGroupFeatureParent === navData.parentId);
                            if (child.parentId === sidenav_model_1.UserGroupFeatureParentEnum.Transportation) {
                                childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleMaintanence
                                    || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleRepair ||
                                    x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleAccident ||
                                    x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicleBreakDown);
                            }
                            else if (child.parentId === sidenav_model_1.UserGroupFeatureParentEnum.Staff) {
                                childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StaffActivity
                                    || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.Homework
                                    || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.Disciplinary);
                            }
                            else if (child.parentId === sidenav_model_1.UserGroupFeatureParentEnum.Administration) {
                                if (child.bindName === 'Sidenav.Children.UserManagement') {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.UserManagementRole
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.UserManagementPermission ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.UserManagementUsers);
                                }
                                else if (child.bindName === 'Sidenav.Children.Setting') {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicEmail
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicLookUp ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicTemplates
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicAutoSequence ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicEvent);
                                }
                                else if (child.bindName === 'Sidenav.Children.Institute') {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteAcademicYear
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteClass ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteClassSubjectMapping
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteSubject
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteTimeTable ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.InstituteWeekOff);
                                }
                                else {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicCountry
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicState ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicCity ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.AcademicCurrency);
                                }
                            }
                            else {
                                if (child.bindName === 'Sidenav.Children.FeeManagement') {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeComponent
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentCourseFeeTerm ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReceipt ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeRefund ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentFeeReport ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentStudentFee);
                                }
                                else {
                                    childrens = childrens.filter(x => x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkClassExam
                                        || x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamDefinition ||
                                        x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum.StudentMarkExamScoreEntry);
                                }
                            }
                            var containTrue = (childrens.map(x => x.canView)).find(s => s === true);
                            if (containTrue) {
                                child.show = true;
                            }
                            else {
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
    onWindowResize() {
        if (window.innerWidth < 768) {
            this.isSidenavExpanded = false;
        }
        else {
            this.isSidenavExpanded = this.isSidenavExpandedDesktop;
        }
    }
    toggleSidenav(value) {
        if (value != null && value != undefined) {
            this.isSidenavExpanded = value;
        }
        else {
            this.isSidenavExpanded = !this.isSidenavExpanded;
        }
        if (window.innerWidth > 767) {
            this.isSidenavExpandedDesktop = this.isSidenavExpanded;
        }
    }
    languageChange(event) {
        this.translate.use(event);
        setTimeout(() => {
            this.changeLabel();
        }, 0);
    }
    directionChange(value) {
        this.direction = value;
    }
    changeLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < this.nav.length; i++) {
                var value = yield this.translate.get(this.nav[i].bindName).toPromise();
                this.nav[i].name = value;
                if (this.nav[i].children) {
                    for (var j = 0; j < this.nav[i].children.length; j++) {
                        var childValue = yield this.translate.get(this.nav[i].children[j].bindName).toPromise();
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
        });
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
                }
                else {
                    this.openModal();
                }
            }
            else {
                this.selectedInstitute = anySelected[0];
                this.getAcademicYears();
            }
            this.loaderService.toggleLoader(false);
        });
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
        });
    }
    openModal() {
        this.dialog.open(this.template, { width: '250px', disableClose: true });
    }
    closeModal(dialogRef) {
        this.updateCurrentInstitute();
        dialogRef.close();
    }
    instituteChange(institute) {
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
                let currentAcademicYear = {};
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
    academicYearChange(academicYear) {
        this.selectedAcademicYear = academicYear;
        this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
        this.sharedService.changeAcademicYear(academicYear);
        location.reload();
    }
    addorUpdateSelectedAcademicYear(yearId) {
        this.loaderService.toggleLoader(true);
        this.appService.addorUpdateSelectedAcademicYear(yearId).then(res => {
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.ViewChild(core_1.TemplateRef),
    __metadata("design:type", core_1.TemplateRef)
], AppComponent.prototype, "template", void 0);
__decorate([
    core_1.HostListener('window:resize', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "onWindowResize", null);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        moduleId: module.id,
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, loader_service_1.LoaderService, page_title_1.PageTitleService,
        core_2.TranslateService, app_service_1.AppService, material_1.MatDialog,
        shared_service_1.SharedService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map