import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class CountryManagementService {
  CountryManagementUrl = 'api/institutecountrystatecity/country';
  constructor(private http: HttpService) { }

  addInstituteCountry(country: any) {
    return this.http.post(this.CountryManagementUrl, country);
  }

  getAllCountries() {
    return this.http.get(this.CountryManagementUrl);
  }

  getCountryDetails(countryId: number) {
    return this.http.get(this.CountryManagementUrl + '/' + countryId);
  }

  updaInstituteCountry(country: any) {
    return this.http.put(this.CountryManagementUrl, country);
  }
}
