import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { HostelFloor, BedModel } from './hostel-floor.model';

@Injectable()
export class FloorRoomService {
  FloorRoomManagementUrl = 'api/floorRoom';
  roomTypeUrl = 'api/roomType';
  bedStatusUrl = 'api/bedStatus';
  bedUrl = 'api/bed';

  constructor(private http: HttpService) {}

  getFloorsForLoggedInUser() {
    return this.http.get(this.FloorRoomManagementUrl);
  }

  getRoomTypeList() {
    return this.http.get(this.roomTypeUrl);
  }

  getBedStatusList() {
    return this.http.get(this.bedStatusUrl);
  }

  getBedList(roomId: number) {
    return this.http.get(this.bedUrl + `/room/${roomId}`);
  }

  getRoomsForBlockFloor(blockId: number, floorNo: number) {
    return this.http.get(this.FloorRoomManagementUrl + `/${blockId}/${floorNo}`);
  }

  getFloorRoomById(id: number) {
    return this.http.get(this.FloorRoomManagementUrl + `/${id}`);
  }

  addFloorRoom(hostelFloor: HostelFloor) {
    return this.http.post(this.FloorRoomManagementUrl, hostelFloor);
  }

  addBeds(bedLsit: BedModel[]) {
    return this.http.post(this.bedUrl, bedLsit);
  }

  updateFloorRoom(hostelFloor: HostelFloor) {
    return this.http.put(this.FloorRoomManagementUrl, hostelFloor);
  }

  updateBed(bedList: BedModel[]) {
    return this.http.put(this.bedUrl, bedList);
  }

  deleteFloorRoom(hostelFloorId: number) {
    return this.http.delete(this.FloorRoomManagementUrl + '/' + hostelFloorId);
  }
}