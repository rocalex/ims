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
const loader_service_1 = require("../../shared/loader-service");
const student_management_dashboard_service_1 = require("../student-management/student-management-dashboard/student-management-dashboard.service");
const staff_management_dashboard_service_1 = require("../staff-management/staff-management-dashboard/staff-management-dashboard.service");
const staff_management_notice_service_1 = require("../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service");
const staff_management_notice_model_1 = require("../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model");
const permission_service_1 = require("../../shared/permission.service");
const sidenav_model_1 = require("../../shared/sidenav/sidenav.model");
const staff_management_homework_service_1 = require("../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service");
let AdminDashboardComponent = class AdminDashboardComponent {
    constructor(loaderService, studentManagementDashboardService, staffManagementDashboardService, staffNoticeManagementService, router, permissionService, staffManagementHomeworkService) {
        this.loaderService = loaderService;
        this.studentManagementDashboardService = studentManagementDashboardService;
        this.staffManagementDashboardService = staffManagementDashboardService;
        this.staffNoticeManagementService = staffNoticeManagementService;
        this.router = router;
        this.permissionService = permissionService;
        this.staffManagementHomeworkService = staffManagementHomeworkService;
        this.studentActivitiesList = [];
        this.staffActivitiesList = [];
        this.staffPlansList = [];
        this.noticeList = [];
        this.circularList = [];
        this.homeworksList = [];
        // Donut chart
        this.donutChartType = 'doughnut';
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
        // Teaching type wise
        this.teachingTypeWiseDonutChartLabels = [];
        this.teachingTypeWiseDonutChartData = [];
        this.teachingTypeWiseDonutChartColor = [{
                backgroundColor: []
            }];
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
        // Class wise students
        this.classWiseStudentsBarChartLabels = [];
        this.classWiseStudentsBarChartColor = [{
                backgroundColor: []
            }];
        this.classWiseStudentsBarChartData = [{
                data: [], label: ''
            }];
        // Active/Inactive students
        this.activeWiseStudentsBarChartLabels = [];
        this.activeWiseStudentsBarChartColor = [{
                backgroundColor: []
            }];
        this.activeWiseStudentsBarChartData = [{
                data: [], label: ''
            }];
        // Active/Inactive staff
        this.activeInactiveStaffBarChartLabels = [];
        this.activeInactiveStaffBarChartData = [{
                data: [], label: ''
            }];
        this.activeInactiveStaffBarChartColor = [{
                backgroundColor: []
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
            this.totalStudentsCount = response.totalStudentsCount;
            this.totalFeeCollected = response.totalFeeCollected;
            this.totalFeeRefunded = response.totalFeeRefunded;
            // Set bar chart data (Class wise)
            this.classWiseStudentsBarChartLabels = response.classWiseStudentPercentagesList.map(x => x.className);
            this.classWiseStudentsBarChartData[0].data = response.classWiseStudentPercentagesList.map(x => x.studentStaffCount);
            this.classWiseStudentsBarChartData[0].data.forEach(() => {
                this.classWiseStudentsBarChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Set bar chart data (Active/Inactive)
            this.activeWiseStudentsBarChartLabels = response.activeInactiveStudentPercentagesList.map(x => x.activity);
            this.activeWiseStudentsBarChartData[0].data = response.activeInactiveStudentPercentagesList.map(x => x.studentStaffCount);
            this.activeWiseStudentsBarChartData[0].data.forEach(() => {
                this.activeWiseStudentsBarChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Calendar view data
            this.calendarEvents = [];
            // Activities
            this.studentActivitiesList = response.activityList;
            this.studentActivitiesList.forEach(activity => {
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
            this.loaderService.toggleLoader(false);
            this.getStaffDashboardData();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getStaffDashboardData() {
        this.staffManagementDashboardService.getStaffDashboardData()
            .then(res => {
            let response = res.json();
            this.totalStaffCount = response.staffsList.length;
            // Set doughnut chart data (Teaching type wise)
            this.teachingTypeWiseDonutChartLabels = response.teachingTypeWiseStaffPercentageList.map(x => x.teachingType);
            this.teachingTypeWiseDonutChartData = response.teachingTypeWiseStaffPercentageList.map(x => x.studentStaffCount);
            this.teachingTypeWiseDonutChartData.forEach(() => {
                this.teachingTypeWiseDonutChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Set bar chart data (Active/Inactive staffs)
            this.activeInactiveStaffBarChartLabels = response.activeInactiveStaffsPercentageList.map(x => x.activity);
            this.activeInactiveStaffBarChartData[0].data = response.activeInactiveStaffsPercentageList.map(x => x.studentStaffCount);
            this.activeInactiveStaffBarChartData[0].data.forEach(() => {
                this.activeInactiveStaffBarChartColor[0].backgroundColor.push(this.getRandomColor());
            });
            // Calendar view data
            if (this.calendarEvents === null || this.calendarEvents === undefined || this.calendarEvents.length === 0) {
                this.calendarEvents = [];
            }
            // Activities
            this.staffActivitiesList = response.activityList;
            this.staffActivitiesList.forEach(activity => {
                if (!this.staffActivitiesList.some(x => x.id === activity.id)) {
                    let event = {
                        id: activity.id,
                        type: 'activity',
                        start: new Date(activity.startDate),
                        end: new Date(activity.endDate),
                        title: activity.name,
                        color: this.calendarEventColors.red
                    };
                    this.calendarEvents.push(event);
                }
            });
            // Planners
            this.staffPlansList = response.staffPlansList;
            this.staffPlansList.forEach(plan => {
                let event = {
                    id: plan.id,
                    type: 'planner',
                    start: new Date(plan.dateOfPlan),
                    title: plan.name,
                    color: this.calendarEventColors.blue
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
AdminDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'admin-dashboard.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        student_management_dashboard_service_1.StudentManagementDashboardService,
        staff_management_dashboard_service_1.StaffManagementDashboardService,
        staff_management_notice_service_1.StaffNoticeManagementService,
        router_1.Router,
        permission_service_1.PermissionService,
        staff_management_homework_service_1.StaffManagementHomeworkService])
], AdminDashboardComponent);
exports.AdminDashboardComponent = AdminDashboardComponent;
//# sourceMappingURL=admin-dashboard.component.js.map