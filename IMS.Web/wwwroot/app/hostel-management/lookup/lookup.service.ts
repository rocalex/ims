import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { RoomTypeModel, BedStatusModel } from './lookup.model';

@Injectable()
export class LookupService {
  roomTypeURL = 'api/roomType';
  bedStatusURL = 'api/bedStatus';

  constructor(private http: HttpService) {}

  getRoomTypeForLoggedInUser() {
    return this.http.get(this.roomTypeURL);
  }

  getBedStatusForLoggedInUser() {
    return this.http.get(this.bedStatusURL);
  }

  getRoomTypeById(id: number) {
      return this.http.get(this.roomTypeURL + `/${id}`);
  }

  getBedStatusById(id: number) {
    return this.http.get(this.bedStatusURL + `/${id}`);
  }

  addRoomType(roomType: RoomTypeModel) {
      return this.http.post(this.roomTypeURL, roomType);
  }

  addBedStatus(bedStatus: BedStatusModel) {
    return this.http.post(this.bedStatusURL, bedStatus);
  }

  updateBedStatus(bedStatus: BedStatusModel) {
      return this.http.put(this.bedStatusURL, bedStatus);
  }

  updateRoomType(roomType: RoomTypeModel) {
    return this.http.put(this.roomTypeURL, roomType);
  }

  deleteRoomType(roomTypeId: number) {
    return this.http.delete(this.roomTypeURL + '/' + roomTypeId);
  }

  deleteBedStatus(bedStatusId: number) {
      return this.http.delete(this.bedStatusURL + '/' + bedStatusId);
  }
}