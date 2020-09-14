import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StaffNoticeManagementService {

    StaffNoticeManagementUrl = 'api/circularnoticemanagement';

    constructor(private http: HttpService) { }

    addNotice(notice: any) {
        return this.http.post(this.StaffNoticeManagementUrl, notice);
    }

    getAllNotices() {
        return this.http.get(this.StaffNoticeManagementUrl);
    }

    getNoticeById(id: number) {
        return this.http.get(this.StaffNoticeManagementUrl + '/' + id);
    }

    updateNotice(notice: any) {
        return this.http.put(this.StaffNoticeManagementUrl, notice);
    }

    getInitialData() {
        return this.http.get(this.StaffNoticeManagementUrl + '/initial');
    }

    deleteNotice(noticeId: number) {
        return this.http.delete(this.StaffNoticeManagementUrl + '/' + noticeId);
    }
}
