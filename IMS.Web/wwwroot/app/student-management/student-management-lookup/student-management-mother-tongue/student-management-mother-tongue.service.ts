import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class MotherTongueManagementService {

    MotherTongueManagementUrl = 'api/mothertonguemanagement';

    constructor(private http: HttpService) { }

    addMotherTongue(motherTongue: any) {
        return this.http.post(this.MotherTongueManagementUrl, motherTongue);
    }

    getAllMotherTongues() {
        return this.http.get(this.MotherTongueManagementUrl);
    }

    getMotherTongueDetail(motherTongueId: number) {
        return this.http.get(this.MotherTongueManagementUrl + '/' + motherTongueId);
    }

    updateMotherTongue(motherTongue: any) {
        return this.http.put(this.MotherTongueManagementUrl + '/' + motherTongue.Id, motherTongue);
    }
}
