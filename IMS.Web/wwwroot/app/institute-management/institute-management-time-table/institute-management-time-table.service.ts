import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddTimeTableDetails } from './institute-management-time-table.model';

@Injectable()
export class TimeTableManagementService {

    TimeTableManagementUrl = 'api/timetablemanagement';

    constructor(private http: HttpService) { }

    // Method for fetching class-sections
    getClassSectionsList() {
        return this.http.get(this.TimeTableManagementUrl + '/class/sections/all');
    }

    // Method for fetching the initial data
    getTimeTableInitialData(classId: number, sectionId: number) {
        return this.http.get(this.TimeTableManagementUrl + '/initialdata/' + classId + '/' + sectionId);
    }

    // Method for bulk saving the time table data
    bulkSaveTimeTableData(addedTimeTable: AddTimeTableDetails) {
        return this.http.post(this.TimeTableManagementUrl, addedTimeTable);
    }

    // Method for fetching the time table details for a particular academic year, class and section
    getTimeTableDetailsByAcademicYearId(classId: number, sectionId: number, academicYearId: number) {
        return this.http.get(this.TimeTableManagementUrl + '/details/' + classId + '/' + sectionId + '/' + academicYearId);
    }
}
