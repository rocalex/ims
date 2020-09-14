import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class OccupationManagementService {
  OccupationManagementUrl = 'api/occupationmanagement';
  constructor(private http: HttpService) { }

  addInstituteOccupation(occupation: any) {
    return this.http.post(this.OccupationManagementUrl, occupation);
  }

  getAllInstituteOccupation() {
    return this.http.get(this.OccupationManagementUrl);
  }

  getInstituteOccupationDetail(occupationId: number) {
    return this.http.get(this.OccupationManagementUrl + '/' + occupationId);
  }

  updateInstituteOccupation(occupation: any) {
    return this.http.put(this.OccupationManagementUrl, occupation);
  }
}
