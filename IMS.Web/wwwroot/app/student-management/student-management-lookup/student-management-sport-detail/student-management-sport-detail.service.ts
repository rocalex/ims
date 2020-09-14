import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class SportDetailManagementService {
  SportDetailManagementUrl = 'api/sportdetailmanagement';
  constructor(private http: HttpService) { }

  addInstituteSportDetail(sportDetail: any) {
    return this.http.post(this.SportDetailManagementUrl, sportDetail);
  }

  getAllInstituteSportDetail() {
    return this.http.get(this.SportDetailManagementUrl);
  }

  getInstituteSportDetailDetail(sportDetailId: number) {
    return this.http.get(this.SportDetailManagementUrl + '/' + sportDetailId);
  }

  updateInstituteSportDetail(sportDetail: any) {
    return this.http.put(this.SportDetailManagementUrl, sportDetail);
  }
}
