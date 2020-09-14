import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffDesignationManagementService {

    StaffDesignationManagementUrl = 'api/designationmanagement';

    constructor(private http: HttpService) { }

    addDesignation(designation: any) {
        return this.http.post(this.StaffDesignationManagementUrl, designation);
    }

    getAllDesignations() {
        return this.http.get(this.StaffDesignationManagementUrl);
    }

    getDesignationDetail(designationId: number) {
        return this.http.get(this.StaffDesignationManagementUrl + '/' + designationId);
    }

    updateDesignation(designation: any) {
        return this.http.put(this.StaffDesignationManagementUrl + '/' + designation.id, designation);
    }
}
