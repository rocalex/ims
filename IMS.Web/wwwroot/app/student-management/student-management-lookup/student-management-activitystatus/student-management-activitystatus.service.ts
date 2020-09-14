import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class ActivityStatusManagementService {
    ActivityStatusManagementUrl = 'api/activitystatusmanagement';
  constructor(private http: HttpService) { }

  addInstituteActivityStatus(activitystatus: any) {
    return this.http.post(this.ActivityStatusManagementUrl, activitystatus);
  }

  getAllInstituteActivityStatus() {
    return this.http.get(this.ActivityStatusManagementUrl);
  }

  getInstituteActivityStatusDetail(meetingagendaId: number) {
    return this.http.get(this.ActivityStatusManagementUrl + '/' + meetingagendaId);
  }

  updateInstituteActivityStatus(activitystatus: any) {
    return this.http.put(this.ActivityStatusManagementUrl, activitystatus);
  }
}
