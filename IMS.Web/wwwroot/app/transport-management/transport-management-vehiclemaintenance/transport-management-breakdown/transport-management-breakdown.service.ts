import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TransportManagementBreakDownService {
  BreakDownManagementUrl = 'api/vehiclebreakdownmanagement';
  constructor(private http: HttpService) { }

  addBreakDown(breakdown: any) {
    return this.http.post(this.BreakDownManagementUrl, breakdown);
  }

  getBreakDowns() {
    return this.http.get(this.BreakDownManagementUrl);
  }

  getBreakDown(breakdownId: number) {
    return this.http.get(this.BreakDownManagementUrl + '/' + breakdownId);
  }

  updateBreakDown(breakdown: any) {
    return this.http.put(this.BreakDownManagementUrl, breakdown);
  }

  getInitialData() {
    return this.http.get(this.BreakDownManagementUrl + '/initialdata');
  }
}
