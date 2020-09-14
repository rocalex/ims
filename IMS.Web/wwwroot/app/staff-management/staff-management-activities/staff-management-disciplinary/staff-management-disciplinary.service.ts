import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StaffDisciplinaryManagementService {
  StaffDisciplinaryManagementUrl = 'api/disciplinarymanagement';
  constructor(private http: HttpService) { }

  addDisciplinary(disciplinary: any) {
    return this.http.post(this.StaffDisciplinaryManagementUrl, disciplinary);
  }

  getDisciplinaries() {
    return this.http.get(this.StaffDisciplinaryManagementUrl);
  }

  getDisciplinary(id: number) {
    return this.http.get(this.StaffDisciplinaryManagementUrl + '/' + id);
  }

  updateDisciplinary(disciplinary: any) {
    return this.http.put(this.StaffDisciplinaryManagementUrl, disciplinary);
  }

  getInitialData() {
    return this.http.get(this.StaffDisciplinaryManagementUrl + '/initialdata');
  }
}
