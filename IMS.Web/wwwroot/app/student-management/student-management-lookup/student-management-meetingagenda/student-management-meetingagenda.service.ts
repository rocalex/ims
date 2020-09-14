import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class MeetingAgendaManagementService {
  MeetingAgendaManagementUrl = 'api/meetingagendamanagement';
  constructor(private http: HttpService) { }

  addInstituteMeetingAgenda(meetingagenda: any) {
    return this.http.post(this.MeetingAgendaManagementUrl, meetingagenda);
  }

  getAllInstituteMeetingAgenda() {
    return this.http.get(this.MeetingAgendaManagementUrl);
  }

  getInstituteMeetingAgendaDetail(meetingagendaId: number) {
    return this.http.get(this.MeetingAgendaManagementUrl + '/' + meetingagendaId);
  }

  updateInstituteMeetingAgenda(meetingagenda: any) {
    return this.http.put(this.MeetingAgendaManagementUrl, meetingagenda);
  }
}
