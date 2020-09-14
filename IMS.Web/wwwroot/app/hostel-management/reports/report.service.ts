import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class ReportService {
    allocateUrl = 'api/bedAllocation';
    messManageUrl = 'api/messManage';

    constructor(private http: HttpService) { }

    getAllocationSummary(blockId: number, floorId: number) {
        return this.http.get(this.allocateUrl + `/report/${blockId}/${floorId}`);
    }

    getMessManageSummar(messManageId: number) {
        return this.http.get(this.messManageUrl + `/report/${messManageId}`)
    }
}