import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { TimesheetModel } from './timesheets.model';

@Injectable()
export class TimeSheetService {
  timesheetUrl = 'api/timesheet';
  staffUrl = 'api/staffManagement';
  academicUrl = 'api/instituteAcademicYearManagement';

  constructor(private http: HttpService) {}

  getStaffList() {
    return this.http.get(this.staffUrl);
  }

  getAcademicList() {
      return this.http.get(this.academicUrl);
  }

  getTimesheetsForStaffByDate(id: number, date: Date) {
    return this.http.post(this.timesheetUrl + `/${id}`, date);
  }

  getTimesheetsForStaffByMonth(id: number, month: number) {
      return this.http.get(this.timesheetUrl + `/${id}/${month}`);
  }

  getBookTypeById(id: number) {
    return this.http.get(this.timesheetUrl + `/${id}`);
  }

  saveTimesheetByMonth(timesheets: TimesheetModel[]) {
      return this.http.post(this.timesheetUrl, timesheets);
  }

  saveTimesheetsByDate(timesheet: TimesheetModel) {
      return this.http.put(this.timesheetUrl, timesheet);
  }
}