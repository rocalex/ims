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
let LookupService = class LookupService {
    constructor(http) {
        this.http = http;
        this.roomTypeURL = 'api/roomType';
        this.bedStatusURL = 'api/bedStatus';
    }
    getRoomTypeForLoggedInUser() {
        return this.http.get(this.roomTypeURL);
    }
    getBedStatusForLoggedInUser() {
        return this.http.get(this.bedStatusURL);
    }
    getRoomTypeById(id) {
        return this.http.get(this.roomTypeURL + `/${id}`);
    }
    getBedStatusById(id) {
        return this.http.get(this.bedStatusURL + `/${id}`);
    }
    addRoomType(roomType) {
        return this.http.post(this.roomTypeURL, roomType);
    }
    addBedStatus(bedStatus) {
        return this.http.post(this.bedStatusURL, bedStatus);
    }
    updateBedStatus(bedStatus) {
        return this.http.put(this.bedStatusURL, bedStatus);
    }
    updateRoomType(roomType) {
        return this.http.put(this.roomTypeURL, roomType);
    }
    deleteRoomType(roomTypeId) {
        return this.http.delete(this.roomTypeURL + '/' + roomTypeId);
    }
    deleteBedStatus(bedStatusId) {
        return this.http.delete(this.bedStatusURL + '/' + bedStatusId);
    }
};
LookupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], LookupService);
exports.LookupService = LookupService;
//# sourceMappingURL=lookup.service.js.map