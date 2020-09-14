import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StateManagementService {
  StateManagementUrl = 'api/institutecountrystatecity/state';
  CountryManagementUrl = 'api/institutecountrystatecity/country';
  constructor(private http: HttpService) { }

  addInstituteState(state: any) {
    return this.http.post(this.StateManagementUrl, state);
  }

  getAllStates() {
    return this.http.get(this.StateManagementUrl);
  }

  getStateDetails(stateId: number) {
    return this.http.get(this.StateManagementUrl + '/' + stateId);
  }

  updaInstituteState(state: any) {
    return this.http.put(this.StateManagementUrl, state);
  }

  getAllCountries() {
    return this.http.get(this.CountryManagementUrl);
  }
}
