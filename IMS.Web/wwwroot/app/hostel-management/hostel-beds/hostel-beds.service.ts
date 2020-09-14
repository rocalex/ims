import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class BedService {
  hostelUrl = 'api/hostel';
  blockUrl = 'api/hostelBlock';
  bedUrl = 'api/bed';

  constructor(private http: HttpService) {}

  getHostelForLoggedInUser() {
      return this.http.get(this.hostelUrl);
  }

  getBlockByHostelId(id: number) {
    return this.http.get(this.blockUrl + '/hostel/' + id);
  }
  
  getRoomByFloor(blockId, floorId) {
      return this.http.get(this.bedUrl + `/beds/${blockId}/${floorId}`);
  }
}