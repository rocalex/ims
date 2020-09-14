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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const angular_calendar_1 = require("angular-calendar");
const date_fns_1 = require("date-fns");
const loader_service_1 = require("../../../shared/loader-service");
const student_management_dashboard_service_1 = require("./student-management-dashboard.service");
const staff_management_notice_service_1 = require("../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service");
const permission_service_1 = require("../../../shared/permission.service");
const staff_management_homework_service_1 = require("../../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service");
const staff_management_notice_model_1 = require("../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
let StudentManagementDashboardComponent = class StudentManagementDashboardComponent {
    constructor(studentManagementDashboardService, loaderService, router, staffNoticeManagementService, permissionService, staffManagementHomeworkService) {
        this.studentManagementDashboardService = studentManagementDashboardService;
        this.loaderService = loaderService;
        this.router = router;
        this.staffNoticeManagementService = staffNoticeManagementService;
        this.permissionService = permissionService;
        this.staffManagementHomeworkService = staffManagementHomeworkService;
        this.activitiesList = [];
        this.noticeList = [];
        this.circularList = [];
        this.homeworksList = [];
        // Pie chart
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartType = 'pie';
        this.pieChartColor = [{
                backgroundColor: []
            }];
        this.pieChartOptions = {
            responsive: true,
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },
                },
            }
        };
        // Donut chart
        this.donutChartLabels = [];
        this.donutChartData = [];
        this.donutChartType = 'doughnut';
        this.donutChartColor = [{
                backgroundColor: []
            }];
        this.donutChartOptions = {
            responsive: true,
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },
                },
            }
        };
        // Bar chart
        // Common settings
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{}], yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                }
            }
        };
        // Class wise
        this.classWiseBarChartLabels = [];
        this.classWiseBarChartColor = [{
                backgroundColor: []
            }];
        this.classWiseBarChartData = [{
                data: [], label: ''
            }];
        // Active/Inactive
        this.activeWiseBarChartLabels = [];
        this.activeWiseBarChartColor = [{
                backgroundColor: []
            }];
        this.activeWiseBarChartData = [{
                data: [], label: ''
            }];
        // Calendar View
        this.view = angular_calendar_1.CalendarView.Month;
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.CalendarView = angular_calendar_1.CalendarView;
        this.calendarEvents = [];
        this.calendarEventColors = {
            red: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
            blue: {
                primary: '#1e90ff',
                secondary: '#D1E8FF'
            },
            yellow: {
                primary: '#e3bc08',
                secondary: '#FDF1BA'
            }
        };
    }
    ngOnInit() {
        this.getStudentDashboardData();
    }
    getStudentDashboardData() {
        this.loaderService.toggleLoader(true);
        this.studentManagementDashboardService.getStudentDashboardData()
            .then(res => {
            let response = res.json();
            // Set counts
            this.totalStudentsCount = response.totalStudentsCount;
            this.activeStudentsCount = response.activeStudentsCount;
            this.inActiveStudentsCount = response.inActiveStudentsCount;
            this.terminatedStudentsCount = response.terminatedStudentsCount;
            this.totalFeeCollected = response.totalFeeCollected;
            this.totalFeeRefunded = response.totalFeeRefunded;
            // Set pie chart data (Religion wise)
            this.pieChartLabels = response.religionWiseStudentPercentagesList.map(x => x.religionName);
            this.pieChartData = response.religionWiseStudentPercentagesList.map(x => x.studentStaffCount);
            this.pieChartData.forEach(() => {
                this.pieChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Set doghnut chart data (Gender wise)
            this.donutChartLabels = response.genderWiseStudentPercentagesList.map(x => x.gender);
            this.donutChartData = response.genderWiseStudentPercentagesList.map(x => x.studentStaffCount);
            this.donutChartData.forEach(() => {
                this.donutChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Set bar chart data (Class wise)
            this.classWiseBarChartLabels = response.classWiseStudentPercentagesList.map(x => x.className);
            this.classWiseBarChartData[0].data = response.classWiseStudentPercentagesList.map(x => x.studentStaffCount);
            this.classWiseBarChartData[0].data.forEach(() => {
                this.classWiseBarChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Set bar chart data (Active/Inactive)
            this.activeWiseBarChartLabels = response.activeInactiveStudentPercentagesList.map(x => x.activity);
            this.activeWiseBarChartData[0].data = response.activeInactiveStudentPercentagesList.map(x => x.studentStaffCount);
            this.activeWiseBarChartData[0].data.forEach(() => {
                this.activeWiseBarChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Calendar view data
            this.calendarEvents = [];
            // Activities
            this.activitiesList = response.activityList;
            this.activitiesList.forEach(activity => {
                let event = {
                    id: activity.id,
                    type: 'activity',
                    start: new Date(activity.startDate),
                    end: new Date(activity.endDate),
                    title: activity.name,
                    color: this.calendarEventColors.red
                };
                this.calendarEvents.push(event);
            });
            this.getCircularNotice();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getCircularNotice() {
        this.loaderService.toggleLoader(true);
        this.staffNoticeManagementService.getAllNotices()
            .then(res => {
            let response = res.json();
            this.noticeList = response.filter(x => x.noticeType === staff_management_notice_model_1.NoticeTypeEnum.Notice);
            this.circularList = response.filter(x => x.noticeType === staff_management_notice_model_1.NoticeTypeEnum.Circular);
            this.getHomeworks();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getHomeworks() {
        this.loaderService.toggleLoader(true);
        this.staffManagementHomeworkService.getAllHomeworks()
            .then(res => {
            let response = res.json();
            response.forEach(homework => {
                homework.homeworkSubjectMappings.forEach(homeworkData => {
                    this.homeworksList.push({
                        staff: homework.staff.firstName,
                        homework: homeworkData.homeworkData,
                        homeworkDate: homework.homeworkDate
                    });
                });
            });
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
    setView(view) {
        this.view = view;
    }
    handleEvent(action, event) {
        if (event.type === 'activity') {
            this.router.navigate(['staff', 'activities', event.type, event.id]);
        }
        else if (event.type === 'planner') {
            this.router.navigate(['staff', event.type, event.id]);
        }
    }
    dayClicked({ date, events }) {
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.CircularNotice, type);
    }
};
StudentManagementDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-dashboard.html'
    }),
    __metadata("design:paramtypes", [student_management_dashboard_service_1.StudentManagementDashboardService,
        loader_service_1.LoaderService,
        router_1.Router,
        staff_management_notice_service_1.StaffNoticeManagementService,
        permission_service_1.PermissionService,
        staff_management_homework_service_1.StaffManagementHomeworkService])
], StudentManagementDashboardComponent);
exports.StudentManagementDashboardComponent = StudentManagementDashboardComponent;
//# sourceMappingURL=student-management-dashboard.component.js.map