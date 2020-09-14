"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_service_1 = require("../../../core/http.service");
let FloorRoomService = class FloorRoomService {
    constructor(http) {
        this.http = http;
        this.FloorRoomManagementUrl = 'api/floorRoom';
        this.roomTypeUrl = 'api/roomType';
        this.bedStatusUrl = 'api/bedStatus';
        this.bedUrl = 'api/bed';
    }
    getFloorsForLoggedInUser() {
        return this.http.get(this.FloorRoomManagementUrl);
    }
    getRoomTypeList() {
        return this.http.get(this.roomTypeUrl);
    }
    getBedStatusList() {
        return this.http.get(this.bedStatusUrl);
    }
    getBedList(roomId) {
        return this.http.get(this.bedUrl + `/room/${roomId}`);
    }
    getRoomsForBlockFloor(blockId, floorNo) {
        return this.http.get(this.FloorRoomManagementUrl + `/${blockId}/${floorNo}`);
    }
    getFloorRoomById(id) {
        return this.http.get(this.FloorRoomManagementUrl + `/${id}`);
    }
    addFloorRoom(hostelFloor) {
        return this.http.post(this.FloorRoomManagementUrl, hostelFloor);
    }
    addBeds(bedLsit) {
        return this.http.post(this.bedUrl, bedLsit);
    }
    updateFloorRoom(hostelFloor) {
        return this.http.put(this.FloorRoomManagementUrl, hostelFloor);
    }
    updateBed(bedList) {
        return this.http.put(this.bedUrl, bedList);
    }
    deleteFloorRoom(hostelFloorId) {
        return this.http.delete(this.FloorRoomManagementUrl + '/' + hostelFloorId);
    }
};
FloorRoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], FloorRoomService);
exports.FloorRoomService = FloorRoomService;
//# sourceMappingURL=hostel-floor.service.js.map