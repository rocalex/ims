import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';

@Injectable()
export class NotificationManagementService {

    NotificationManagementUrl = 'api/notificationmanagement';

    constructor(private http: HttpService) { }

    getAllNotifications() {
        return this.http.get(this.NotificationManagementUrl + '/current/all');
    }

    markNotificationAsRead(notificationId: number) {
        return this.http.get(this.NotificationManagementUrl + '/current/markread/' + notificationId);
    }

    markAllNotificationAsRead() {
        return this.http.get(this.NotificationManagementUrl + '/current/markread/all');
    }
}