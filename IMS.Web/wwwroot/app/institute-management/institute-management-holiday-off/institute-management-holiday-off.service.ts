import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';


// Model


@Injectable()
export class HolidayOffManagementService {

    HolidayManagementUrl = 'api/holidaymanagement';

    constructor(private http: HttpService) { }

    // Method for fetching the holidays for the selected academic year
    getHolidayssForSelectedAcademicYear(selectedAcademicYearId: number) {
        return this.http.get(this.HolidayManagementUrl + "/academicyear/" + selectedAcademicYearId);
    }

    // Method for fetching the list of holiday occurance types
    getHolidayOccuranceTypesList(academicYeadId: number) {
        return this.http.get(this.HolidayManagementUrl + '/' + academicYeadId + "/occurance/all")
    }

    // Method for adding new holiday
    addHoliday(holiday: any) {
        return this.http.post(this.HolidayManagementUrl, holiday);
    }

    // Method for fetching the details of the holiday
    getHolidayDetails(holidayId: number) {
        return this.http.get(this.HolidayManagementUrl + "/holiday/" + holidayId);
    }

    // Method for updating holiday
    updateHoliday(holiday: any) {
        return this.http.put(this.HolidayManagementUrl + '/' + holiday.id, holiday);
    }

    // Method for deleting holiday
    deleteHoliday(holidayId: number) {
        return this.http.delete(this.HolidayManagementUrl + "/" + holidayId);
    }
}
