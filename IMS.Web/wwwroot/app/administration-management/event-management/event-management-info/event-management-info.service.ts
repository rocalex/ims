import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

import { EventManagementInfoModel } from '../event-management.model';

@Injectable()
export class EventManagementService {

    EventManagementUrl = 'api/eventmanagement/info';

    constructor(private http: HttpService) { }

    getEventInfoList() {
        return this.http.get(this.EventManagementUrl);
    }

    getEventInfoById(eventInfoId: number) {
        return this.http.get(this.EventManagementUrl + '/' + eventInfoId);
    }

    addNewEventInfo(addedEventInfo: EventManagementInfoModel) {
        return this.http.post(this.EventManagementUrl, addedEventInfo);
    }

    updateEventInfo(updatedEventInfo: EventManagementInfoModel) {
        return this.http.put(this.EventManagementUrl, updatedEventInfo);
    }
}
