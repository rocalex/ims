import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class CourseFeeTermsManagementService {

    FeeComponentManagementUrl = 'api/feemanagement/coursefeeterms';

    constructor(private http: HttpService) { }

    getInstituteClassList() {
        return this.http.get(this.FeeComponentManagementUrl + '/class');
    }

    getCourseFeeTermInitialData(classId: number) {
        return this.http.get(this.FeeComponentManagementUrl + '/bundle/' + classId)
    }

    getDistributedFeeStructure(courseFeeTermId: number, termNumber: number) {
        return this.http.get(this.FeeComponentManagementUrl + '/details/' + courseFeeTermId + '/term/' + termNumber);
    }

    saveCourseFeeDetails(addCourseFeeTerm) {
        return this.http.post(this.FeeComponentManagementUrl + '/addorupdate', addCourseFeeTerm);
    }
}
