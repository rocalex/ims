import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

import { LoaderService } from '../../shared/loader-service';
import { StudentManagementDashboardService } from '../student-management/student-management-dashboard/student-management-dashboard.service';
import { StaffManagementDashboardService } from '../staff-management/staff-management-dashboard/staff-management-dashboard.service';
import { StaffNoticeManagementService } from '../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service';
import { NoticeTypeEnum } from '../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model';
import { PermissionService } from '../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../shared/sidenav/sidenav.model';
import { StaffManagementHomeworkService } from '../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service';

@Component({
    moduleId: module.id,
    templateUrl: 'admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {

    studentActivitiesList: any[] = [];
    staffActivitiesList: any[] = [];
    staffPlansList: any[] = [];
    noticeList: any[] = [];
    circularList: any[] = [];
    homeworksList: any[] = [];

    // Counts
    totalStudentsCount: number;
    totalFeeCollected: number;
    totalFeeRefunded: number;
    totalStaffCount: number;

    // Donut chart
    donutChartType: string = 'doughnut';
    donutChartOptions: any = {
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
    teachingTypeWiseDonutChartLabels: string[] = [];
    teachingTypeWiseDonutChartData: number[] = [];
    teachingTypeWiseDonutChartColor: any = [{
        backgroundColor: []
    }];

    // Bar chart
    // Common settings
    barChartType: string = 'bar';
    barChartLegend = false;
    barChartOptions: any = {
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
    classWiseStudentsBarChartLabels: string[] = [];
    classWiseStudentsBarChartColor: any = [{
        backgroundColor: []
    }];
    classWiseStudentsBarChartData: any[] = [{
        data: [], label: ''
    }];

    // Active/Inactive students
    activeWiseStudentsBarChartLabels: string[] = [];
    activeWiseStudentsBarChartColor: any = [{
        backgroundColor: []
    }];
    activeWiseStudentsBarChartData: any[] = [{
        data: [], label: ''
    }];

    // Active/Inactive staff
    activeInactiveStaffBarChartLabels: string[] = [];
    activeInactiveStaffBarChartData: any[] = [{
        data: [], label: ''
    }];
    activeInactiveStaffBarChartColor: any = [{
        backgroundColor: []
    }];

    // Calendar View
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;
    CalendarView = CalendarView;
    calendarEvents: CalendarEvent[] = [];
    calendarEventColors: any = {
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

    constructor(private loaderService: LoaderService,
        private studentManagementDashboardService: StudentManagementDashboardService,
        private staffManagementDashboardService: StaffManagementDashboardService,
        private staffNoticeManagementService: StaffNoticeManagementService,
        private router: Router,
        private permissionService: PermissionService,
        private staffManagementHomeworkService: StaffManagementHomeworkService) { }

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
                    let event: any = {
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
                        let event: any = {
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
                    let event: any = {
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
                this.noticeList = response.filter(x => x.noticeType === NoticeTypeEnum.Notice);
                this.circularList = response.filter(x => x.noticeType === NoticeTypeEnum.Circular);

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

    getRandomColor(): string {
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

    setView(view: CalendarView) {
        this.view = view;
    }

    handleEvent(action: string, event: any): void {
        if (event.type === 'activity') {
            this.router.navigate(['staff', 'activities', event.type, event.id]);
        }
        else if (event.type === 'planner') {
            this.router.navigate(['staff', event.type, event.id]);
        }
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.CircularNotice, type);
    }
}
