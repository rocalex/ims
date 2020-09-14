import { Component, OnInit } from '@angular/core';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

import { LoaderService } from '../../shared/loader-service';
import { DashboardService } from './dashboard.service';
import { PrintService } from '../../shared/print.service';

import { UserDashboardModel, UserDashboardTypeEnum, Attendance, AttendanceType } from './dashboard.model';
import { SharedService } from '../../shared/shared.service';
import { TimeTable, TimeTableDetails, TimeTableBreakDetails } from '../../app/institute-management/institute-management-time-table/institute-management-time-table.model';

@Component({
  moduleId: module.id,
  templateUrl: 'dashboard.html'
})
export class AppUserDashboardComponent implements OnInit {

  activitiesList: any[] = [];
  globallySelectedAcademicYear: any = {};
  userDashboardDetails: UserDashboardModel = new UserDashboardModel();
  userDashboardTypeEnumList: UserDashboardTypeEnum[] = [UserDashboardTypeEnum.Student, UserDashboardTypeEnum.Staff];
  classList: any[] = [];
  sectionsList: any[] = [];
  selectedClassId: number;
  selectedSectionId: number;

  timeTable: TimeTable = new TimeTable();
  timeTableDetailsList: TimeTableDetails[] = [];
  timeTableBreakDetailsList: TimeTableBreakDetails[] = [];
  rowHeaders: any[] = [];
  attendance: Attendance = new Attendance();
  attendances: any[] = [];
  attendanceTypes: string[] = ['Daily', 'Monthly'];
  selectedAttendance: string;
  selectedDate: Date = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth: string;
  attendanceColumns: number[] = [];

  timeTableDesignClassList = ["badge-primary", "badge-secondary", "badge-info", "badge-success", "badge-danger"];

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
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private printService: PrintService) { }

  ngOnInit() {
    this.selectedMonth = this.monthNames[(new Date()).getMonth()];
    this.sharedService.currentAcademicYear.subscribe(res => {
      this.globallySelectedAcademicYear = res;
      if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
        this.getUserDashboardDetails();
      }
    });
  }

  getUserDashboardDetails() {
    this.loaderService.toggleLoader(true);
    this.dashboardService.getUserDashboardDetails(this.globallySelectedAcademicYear.id)
      .then(res => {
        let response = res.json();

        this.userDashboardDetails = response;
        this.classList = response.classList;
        this.sectionsList = response.sectionsList;

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

        if (response.timeTableDetails.timeTable !== null && response.timeTableDetails.timeTable !== undefined) {
          this.timeTable = response.timeTableDetails.timeTable;
        }
        if (response.timeTableDetails.timeTableSubjectDetailsList !== null && response.timeTableDetails.timeTableSubjectDetailsList !== undefined && response.timeTableDetails.timeTableSubjectDetailsList.length > 0) {
          this.timeTableDetailsList = response.timeTableDetails.timeTableSubjectDetailsList;
          this.timeTableBreakDetailsList = response.timeTableDetails.timeTableBreakDetailsList;
          this.generateTimeTableRowHeaders();
        }

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  generateTimeTableRowHeaders() {
    // Generate time table column headers
    this.rowHeaders = [];
    let periodStartTime = this.timeTable.periodStartTime;
    let periodNumber = 0;

    for (let i = 0; i < (this.timeTable.periodCount + this.timeTable.breaksCount); i++) {
      let breakPeriod = this.isBreakPeriod(i);
      if (breakPeriod.isBreak) {
        let periodEndTime = this.addTimeDuration(periodStartTime, breakPeriod.breakDuration);
        this.rowHeaders.push({ headerName: 'Br', isBreak: true, periodNumber: 0 });
        periodStartTime = periodEndTime;
      }
      else {
        let periodEndTime = this.addTimeDuration(periodStartTime, this.timeTable.periodDuration);
        this.rowHeaders.push({ headerName: periodStartTime + ' - ' + periodEndTime, isBreak: false, periodNumber: ++periodNumber });
        periodStartTime = periodEndTime;
      }
    }
  }

  isBreakPeriod(index: number): any {
    let isBreak: boolean = false;
    let breakDuration: number = -1;
    for (let i = 0; i < this.timeTableBreakDetailsList.length; i++) {
      if (this.timeTableBreakDetailsList[i].breakAfterPeriod + i === index) {
        isBreak = true;
        breakDuration = this.timeTableBreakDetailsList[i].breakDuration;
        break;
      }
    }
    return { isBreak: isBreak, breakDuration: breakDuration };
  }

  addTimeDuration(time: string, timeDuration: number): string {
    let hourValue = parseInt(time.split(':')[0]);
    let minuteValue = parseInt(time.split(':')[1]);

    minuteValue = minuteValue + timeDuration;

    if (minuteValue >= 60) {
      minuteValue = 0;
      hourValue += 1;

      if (hourValue >= 24) {
        hourValue = 0;
      }
    }

    let minuteValueString = (minuteValue < 10) ? '0' + minuteValue.toString() : minuteValue.toString();
    let hourValueString = (hourValue < 10) ? '0' + hourValue.toString() : hourValue.toString();

    return hourValueString + ':' + minuteValueString;
  }

  getCssClass(timeTableDetail: TimeTableDetails): string {
    if (timeTableDetail.timeTableCssClass === null || timeTableDetail.timeTableCssClass === undefined || timeTableDetail.timeTableCssClass.trim() === '') {
      let index: number = Math.floor(Math.random() * this.timeTableDesignClassList.length);
      timeTableDetail.timeTableCssClass = 'badge d-block text-center ' + this.timeTableDesignClassList[index];
    }
    return timeTableDetail.timeTableCssClass;
  }

  print(elementId: string) {
    this.printService.print(elementId);
  }

  getStaffTimeTable() {
    this.timeTable = new TimeTable();
    this.timeTableDetailsList = [];
    this.timeTableBreakDetailsList = [];
    this.rowHeaders = [];
    this.loaderService.toggleLoader(true);
    this.dashboardService.getStaffTimeTable(this.selectedClassId, this.selectedSectionId, this.globallySelectedAcademicYear.id)
      .then(res => {
        let response = res.json();

        if (response.timeTable !== null && response.timeTable !== undefined) {
          this.timeTable = response.timeTable;
        }
        if (response.timeTableSubjectDetailsList !== null && response.timeTableSubjectDetailsList !== undefined && response.timeTableSubjectDetailsList.length > 0) {
          this.timeTableDetailsList = response.timeTableSubjectDetailsList;
          this.timeTableBreakDetailsList = response.timeTableBreakDetailsList;
          this.generateTimeTableRowHeaders();
        }
        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEvent(action: string, event: any): void {
    let modalData = { event, action };
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

  getStudentAttendance() {
    this.loaderService.toggleLoader(true);
    this.generateTableForAttendance();
    if (this.selectedAttendance === 'Daily') {
      this.attendance.FromDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
      this.attendance.EndDate = this.attendance.FromDate;
    } else {
      this.attendance.FromDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), 1));
      this.attendance.EndDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0));
    }
    this.dashboardService.getStudentAttendanceForStudentDashboard(this.attendance).then(res => {
      var response = res.json();
      for (var i = 0; i < response.length; i++) {
        var attendance = response[i];
        var date = (new Date(attendance.attendanceDate)).getDate();
        var studentAttendance = this.attendances.find(x => x.id === date);
        studentAttendance.value = attendance.attendanceTypeDescription;
      }
      console.log(this.attendances);
      this.loaderService.toggleLoader(false);
    });
  }

  resetAttendance() {
    this.attendances = [];
  }

  generateTableForAttendance() {
    if (this.selectedAttendance === 'Daily') {
      this.attendanceColumns = [this.selectedDate.getDate()];
      this.attendances = [{ id: this.selectedDate.getDate(), value: AttendanceType.None }];
    } else {
      var lastDay = new Date(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0);
      this.attendanceColumns = [];
      this.attendances = [];
      for (var j = 1; j <= lastDay.getDate(); j++) {
        this.attendanceColumns.push(j);
        this.attendances.push({ id: j, value: AttendanceType.None });
      }
    }
  }
}
