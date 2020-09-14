import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';


// Model


@Injectable()
export class WeekOffManagementService {

    WeekOffManagementUrl = 'api/weekoffmanagement';

    constructor(private http: HttpService) { }

    // Method for fetching the week offs for the selected academic year
    getWeekOffsForSelectedAcademicYear(selectedAcademicYearId: number) {
        return this.http.get(this.WeekOffManagementUrl + "/" + selectedAcademicYearId);
    }

    // Method for bulk updating the week offs
    bulkUpdateWeekOffs(updatedWeekOffList: any[]) {
        return this.http.put(this.WeekOffManagementUrl, updatedWeekOffList);
    }
}
