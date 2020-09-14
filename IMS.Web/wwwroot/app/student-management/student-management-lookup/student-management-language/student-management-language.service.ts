import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class LanguageManagementService {
  LanguageManagementUrl = 'api/institutelanguagemanagement';
  constructor(private http: HttpService) { }

  addInstituteLanguage(language: any) {
    return this.http.post(this.LanguageManagementUrl, language);
  }

  getAllInstituteLanguage() {
    return this.http.get(this.LanguageManagementUrl);
  }

  getInstituteLanguageDetail(languageId: number) {
    return this.http.get(this.LanguageManagementUrl + '/' + languageId);
  }

  updateInstituteLanguage(language: any) {
    return this.http.put(this.LanguageManagementUrl, language);
  }
}
