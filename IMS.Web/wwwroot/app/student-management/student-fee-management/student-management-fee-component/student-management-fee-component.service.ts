import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

import { FeeComponent } from '../student-fee-management.model';

@Injectable()
export class FeeComponentManagementService {

    FeeComponentManagementUrl = 'api/feemanagement/component';

    constructor(private http: HttpService) { }

    getAllFeeComponents() {
        return this.http.get(this.FeeComponentManagementUrl);
    }

    addFeeComponent(addedFeeComponent: FeeComponent) {
        return this.http.post(this.FeeComponentManagementUrl, addedFeeComponent);
    }

    getFeeComponentDetailById(feeComponentId: number) {
        return this.http.get(this.FeeComponentManagementUrl + '/' + feeComponentId);
    }

    updateFeeComponent(feeComponent: FeeComponent) {
        return this.http.put(this.FeeComponentManagementUrl, feeComponent);
    }
}
