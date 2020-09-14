import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class CityManagementService {
  CityManagementUrl = 'api/institutecountrystatecity/city';
  CountryManagementUrl = 'api/institutecountrystatecity/country';
  constructor(private http: HttpService) { }

  addInstituteCity(city: any) {
    return this.http.post(this.CityManagementUrl, city);
  }

  getAllCities() {
    return this.http.get(this.CityManagementUrl);
  }

  getCityDetails(cityId: number) {
    return this.http.get(this.CityManagementUrl + '/' + cityId);
  }

  updaInstituteCity(city: any) {
    return this.http.put(this.CityManagementUrl, city);
  }

  getAllCountries() {
    return this.http.get(this.CountryManagementUrl);
  }
}
