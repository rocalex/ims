import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TransportManagementAccidentService {
  AccidentManagementUrl = 'api/vehicleaccidentmanagement';
  constructor(private http: HttpService) { }

  addAccident(accident: any) {
    return this.http.post(this.AccidentManagementUrl, accident);
  }

  getAccidents() {
    return this.http.get(this.AccidentManagementUrl);
  }

  getAccident(accidentId: number) {
    return this.http.get(this.AccidentManagementUrl + '/' + accidentId);
  }

  updateAccident(accident: any) {
    return this.http.put(this.AccidentManagementUrl, accident);
  }

  getInitialData() {
    return this.http.get(this.AccidentManagementUrl + '/initialdata');
  }
}
