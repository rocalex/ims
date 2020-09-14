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
let SwapService = class SwapService {
    constructor(http) {
        this.http = http;
        this.hostelUrl = 'api/hostel';
        this.blockUrl = 'api/hostelBlock';
        this.floorUrl = 'api/floorRoom';
        this.bedUrl = 'api/bed';
        this.allocationUrl = 'api/bedAllocation';
    }
    getHostelForLoggedInUser() {
        return this.http.get(this.hostelUrl);
    }
    getBlockByHostelId(id) {
        return this.http.get(this.blockUrl + '/hostel/' + id);
    }
    getRoomByFloor(blockId, floorId) {
        return this.http.get(this.floorUrl + `/${blockId}/${floorId}`);
    }
    getBedsByFloor(roomId) {
        return this.http.get(this.bedUrl + `/swapable/${roomId}`);
    }
    getAllocations(blockId, floorId, roomId) {
        return this.http.get(this.allocationUrl + `/room/${roomId}`);
    }
    removeAllocation(allocation) {
        return this.http.delete(this.allocationUrl + `/${allocation.id}`);
    }
    updateAllocation(allocation) {
        return this.http.put(this.allocationUrl, allocation);
    }
};
SwapService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], SwapService);
exports.SwapService = SwapService;
//# sourceMappingURL=hostel-swap.service.js.map