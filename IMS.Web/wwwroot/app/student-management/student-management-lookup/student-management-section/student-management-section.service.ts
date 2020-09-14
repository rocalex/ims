import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class SectionManagementService {
  SectionManagementUrl = 'api/sectionmanagement';
  constructor(private http: HttpService) { }

  addInstituteSection(section: any) {
    return this.http.post(this.SectionManagementUrl, section);
  }

  getAllInstituteSection() {
    return this.http.get(this.SectionManagementUrl);
  }

  getInstituteSectionDetail(sectionId: number) {
    return this.http.get(this.SectionManagementUrl + '/' + sectionId);
  }

  updateInstituteSection(section: any) {
    return this.http.put(this.SectionManagementUrl, section);
  }
}
