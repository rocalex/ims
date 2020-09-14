import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffDepartmentManagementService {

    StaffDepartmentManagementUrl = 'api/departmentmanagement';

    constructor(private http: HttpService) { }

    addDepartment(department: any) {
        return this.http.post(this.StaffDepartmentManagementUrl, department);
    }

    getAllDepartments() {
        return this.http.get(this.StaffDepartmentManagementUrl);
    }

    getDepartmentDetail(departmentId: number) {
        return this.http.get(this.StaffDepartmentManagementUrl + '/' + departmentId);
    }

    updateDepartment(department: any) {
        return this.http.put(this.StaffDepartmentManagementUrl + '/' + department.id, department);
    }
}
