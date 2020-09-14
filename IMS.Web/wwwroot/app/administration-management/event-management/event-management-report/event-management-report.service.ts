import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

import { EventManagementReportQueryAc } from '../event-management.model';

@Injectable()
export class EventManagementReportService {

    EventManagementReportUrl = 'api/eventmanagement/report';

    constructor(private http: HttpService) { }

    generateReport(eventManagementReportQueryObj: EventManagementReportQueryAc) {
        return this.http.postForDownloadFile(this.EventManagementReportUrl, eventManagementReportQueryObj);
    }
}
