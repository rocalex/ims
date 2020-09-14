import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddLookUpManagementAc, UpdateLookUpManagementAc } from './look-up-management.model';

@Injectable()
export class LookUpManagementService {
    LookUpManagementUrl = 'api/lookupmanagement';
    constructor(private http: HttpService) { }

    addLookUpMapping(lookUp: AddLookUpManagementAc) {
        return this.http.post(this.LookUpManagementUrl, lookUp);
    }

    getAllLookUpMapping() {
        return this.http.get(this.LookUpManagementUrl);
    }

    getLookUpMappingDetailById(lookUpId: number) {
        return this.http.get(this.LookUpManagementUrl + '/' + lookUpId);
    }

    updateLookUpMapping(lookUp: UpdateLookUpManagementAc) {
        return this.http.put(this.LookUpManagementUrl, lookUp);
    }

    getAllLookUps() {
        return this.http.get(this.LookUpManagementUrl + '/lookups');
    }
}
