import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';


// Model
import { AddAcademicYear } from './institute-management-academic-year.model';

@Injectable()
export class AcademicYearManagementService {

    AcademicYearManagementUrl = 'api/instituteacademicyearmanagement';

    constructor(private http: HttpService) { }

    // Method for fetching the list of all academic years
    getInstituteAcademicYearsList() {
        return this.http.get(this.AcademicYearManagementUrl);
    }

    // Method for adding a new academic year
    addAcademicYear(academicYear: AddAcademicYear) {
        return this.http.post(this.AcademicYearManagementUrl, academicYear);
    }

    // Method for fetching the details of an academic year by id
    getAcademicYearDetails(academicYearId: number) {
        return this.http.get(this.AcademicYearManagementUrl + "/" + academicYearId);
    }

    // Method for updating academic year
    updateAcademicYear(academicYear: any) {
        return this.http.put(this.AcademicYearManagementUrl + '/' + academicYear.id, academicYear);
    }
}
