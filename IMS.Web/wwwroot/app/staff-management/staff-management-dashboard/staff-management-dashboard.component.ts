import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

import { LoaderService } from '../../../shared/loader-service';
import { StaffManagementDashboardService } from './staff-management-dashboard.service';
import { StaffNoticeManagementService } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service';
import { PermissionService } from '../../../shared/permission.service';
import { StaffManagementHomeworkService } from '../../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service';
import { NoticeTypeEnum } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-dashboard.html'
})
export class StaffManagementDashboardComponent implements OnInit {

    staffsList: any[] = [];
    activitiesList: any[] = [];
    staffPlansList: any[] = [];
    noticeList: any[] = [];
    circularList: any[] = [];
    homeworksList: any[] = [];

    // Counts
    totalStaffCount: number;
    activeStaffCount: number;
    inActiveStaffCount: number;
    releasedStaffCount: number;

    // Pie chart 
    pieChartType: string = 'pie';
    pieChartOptions: any = {
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
    // Religion wise
    religionPieChartLabels: string[] = [];
    religionPieChartData: number[] = [];
    religionPieChartColor: any = [{
        backgroundColor: []
    }];
    // Nationality wise
    nationalityPieChartLabels: string[] = [];
    nationalityPieChartData: number[] = [];
    nationalityPieChartColor: any = [{
        backgroundColor: []
    }];

    // Bar chart
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
    // Class wise
    classBarChartLabels: string[] = [];
    classBarChartData: any[] = [{
        data: [], label: ''
    }];
    classBarChartColor: any = [{
        backgroundColor: []
    }];
    // Active/Inactive staff
    activeInactiveBarChartLabels: string[] = [];
    activeInactiveBarChartData: any[] = [{
        data: [], label: ''
    }];
    activeInactiveBarChartColor: any = [{
        backgroundColor: []
    }];

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
    // Gender wise
    genderWiseDonutChartLabels: string[] = [];
    genderWiseDonutChartData: number[] = [];
    genderWiseDonutChartColor: any = [{
        backgroundColor: []
    }];
    // Teaching type wise
    teachingTypeWiseDonutChartLabels: string[] = [];
    teachingTypeWiseDonutChartData: number[] = [];
    teachingTypeWiseDonutChartColor: any = [{
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

    constructor(private staffManagementDashboardService: StaffManagementDashboardService,
        private loaderService: LoaderService,
        private router: Router,
        private staffNoticeManagementService: StaffNoticeManagementService,
        private permissionService: PermissionService,
        private staffManagementHomeworkService: StaffManagementHomeworkService) { }

    ngOnInit() {
        this.getStaffDashboardData();
    }

    getStaffDashboardData() {
        this.loaderService.toggleLoader(true);
        this.staffManagementDashboardService.getStaffDashboardData()
            .then(res => {
                let response = res.json();
                this.staffsList = response.staffsList;

                // Set counts
                this.totalStaffCount = this.staffsList.length;
                this.activeStaffCount = this.staffsList.filter(x => !x.isArchived).length;
                this.inActiveStaffCount = this.staffsList.filter(x => x.isArchived).length;
                this.releasedStaffCount = 0;

                // Set pie chart data (Religion wise)
                this.religionPieChartLabels = response.religionWiseStaffPercentagesList.map(x => x.religionName);
                this.religionPieChartData = response.religionWiseStaffPercentagesList.map(x => x.studentStaffCount);
                this.religionPieChartData.forEach(() => {
                    this.religionPieChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set bar chart data (Class wise)
                this.classBarChartLabels = response.classWiseStaffPercentagesList.map(x => x.className);
                this.classBarChartData[0].data = response.classWiseStaffPercentagesList.map(x => x.studentStaffCount);
                this.classBarChartData[0].data.forEach(() => {
                    this.classBarChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set bar chart data (Active/Inactive staffs)
                this.activeInactiveBarChartLabels = response.activeInactiveStaffsPercentageList.map(x => x.activity);
                this.activeInactiveBarChartData[0].data = response.activeInactiveStaffsPercentageList.map(x => x.studentStaffCount);
                this.activeInactiveBarChartData[0].data.forEach(() => {
                    this.activeInactiveBarChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set doughnut chart data (Gender wise)
                this.genderWiseDonutChartLabels = response.genderWiseStaffPercentageList.map(x => x.gender);
                this.genderWiseDonutChartData = response.genderWiseStaffPercentageList.map(x => x.studentStaffCount);
                this.genderWiseDonutChartData.forEach(() => {
                    this.genderWiseDonutChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set doughnut chart data (Teaching type wise)
                this.teachingTypeWiseDonutChartLabels = response.teachingTypeWiseStaffPercentageList.map(x => x.teachingType);
                this.teachingTypeWiseDonutChartData = response.teachingTypeWiseStaffPercentageList.map(x => x.studentStaffCount);
                this.teachingTypeWiseDonutChartData.forEach(() => {
                    this.teachingTypeWiseDonutChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set pie chart data (Nationality wise)
                this.nationalityPieChartLabels = response.nationalityWiseStaffPercentagesList.map(x => x.nationalityName);
                this.nationalityPieChartData = response.nationalityWiseStaffPercentagesList.map(x => x.studentStaffCount);
                this.nationalityPieChartData.forEach(() => {
                    this.nationalityPieChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Calendar view data
                this.calendarEvents = [];
                // Activities
                this.activitiesList = response.activityList;
                this.activitiesList.forEach(activity => {
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
