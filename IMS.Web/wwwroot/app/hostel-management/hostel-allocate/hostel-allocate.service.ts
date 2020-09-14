import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AllocationModel } from './hostel-allocate.model';

@Injectable()
export class AllocateService {
  hostelUrl = 'api/hostel';
  blockUrl = 'api/hostelBlock';
  roomUrl = 'api/floorRoom';
  bedUrl = 'api/bed';
  allocationUrl = 'api/bedAllocation';

  constructor(private http: HttpService) {}

  getHostelForLoggedInUser() {
      return this.http.get(this.hostelUrl);
  }

  getBlockByHostelId(id: number) {
    return this.http.get(this.blockUrl + '/hostel/' + id);
  }
  
  getStudentsWithMe() {
      return this.http.get(this.allocationUrl + '/createdByMe');
  }

  getRoomList(blockId: number, floorId: number) {
      return this.http.get(this.roomUrl + `/${blockId}/${floorId}`);
  }

  getBedList(blockId: number, floorId: number) {
      return this.http.get(this.bedUrl + `/floor/${blockId}/${floorId}`);
  }

  saveAllocate(allocations: AllocationModel[], blockId, floorId) {
      return this.http.post(this.allocationUrl + `/${blockId}/${floorId}`, allocations);
  }
}