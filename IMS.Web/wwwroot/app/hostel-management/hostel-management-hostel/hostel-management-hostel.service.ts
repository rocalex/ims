import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { HostelModel } from './hostel-management-hostel.model';

@Injectable()
export class HostelManagementHostelService {

    HostelManagementHostelUrl = 'api/hostel';

    constructor(private http: HttpService) { }

    getHostelList() {
        return this.http.get(this.HostelManagementHostelUrl);
    }

    getAdditional() {
        return this.http.get(this.HostelManagementHostelUrl + '/additional');
    }

    getHostelById(hostelId: number) {
        return this.http.get(this.HostelManagementHostelUrl + '/' + hostelId);
    }

    addNewHostel(addedHostel: HostelModel) {
        return this.http.post(this.HostelManagementHostelUrl, addedHostel);
    }

    updateHostel(updatedHostel: HostelModel) {
        return this.http.put(this.HostelManagementHostelUrl, updatedHostel);
    }
}
