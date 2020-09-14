import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class CurrencyManagementService {
  CurrencyManagementUrl = 'api/institutecurrencymanagement';
  constructor(private http: HttpService) { }

  addInstituteCurrency(currency: any) {
    return this.http.post(this.CurrencyManagementUrl, currency);
  }

  getAllCurrencies() {
    return this.http.get(this.CurrencyManagementUrl);
  }

  getCurrencyDetails(currencyId: number) {
    return this.http.get(this.CurrencyManagementUrl + '/' + currencyId);
  }

  updaInstituteCurrency(currency: any) {
    return this.http.put(this.CurrencyManagementUrl, currency);
  }
}
