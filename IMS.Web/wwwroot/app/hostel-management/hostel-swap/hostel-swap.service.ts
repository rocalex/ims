import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Allocation } from './hostel-swap.model';

@Injectable()
export class SwapService {
  hostelUrl = 'api/hostel';
  blockUrl = 'api/hostelBlock';
  floorUrl = 'api/floorRoom';
  bedUrl = 'api/bed';
  allocationUrl = 'api/bedAllocation';

  constructor(private http: HttpService) {}

  getHostelForLoggedInUser() {
      return this.http.get(this.hostelUrl);
  }

  getBlockByHostelId(id: number) {
    return this.http.get(this.blockUrl + '/hostel/' + id);
  }
  
  getRoomByFloor(blockId: number, floorId: number) {
      return this.http.get(this.floorUrl + `/${blockId}/${floorId}`);
  }

  getBedsByFloor(roomId: number) {
    return this.http.get(this.bedUrl + `/swapable/${roomId}`);
  }

  getAllocations(blockId: number, floorId: number, roomId: number) {
      return this.http.get(this.allocationUrl + `/room/${roomId}`);
  }

  removeAllocation(allocation: Allocation) {
    return this.http.delete(this.allocationUrl + `/${allocation.id}`);
  }

  updateAllocation(allocation: Allocation) {
    return this.http.put(this.allocationUrl, allocation);
  }
}