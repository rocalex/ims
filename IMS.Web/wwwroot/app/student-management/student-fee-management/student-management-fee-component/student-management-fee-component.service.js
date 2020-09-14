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
const http_service_1 = require("../../../../core/http.service");
let FeeComponentManagementService = class FeeComponentManagementService {
    constructor(http) {
        this.http = http;
        this.FeeComponentManagementUrl = 'api/feemanagement/component';
    }
    getAllFeeComponents() {
        return this.http.get(this.FeeComponentManagementUrl);
    }
    addFeeComponent(addedFeeComponent) {
        return this.http.post(this.FeeComponentManagementUrl, addedFeeComponent);
    }
    getFeeComponentDetailById(feeComponentId) {
        return this.http.get(this.FeeComponentManagementUrl + '/' + feeComponentId);
    }
    updateFeeComponent(feeComponent) {
        return this.http.put(this.FeeComponentManagementUrl, feeComponent);
    }
};
FeeComponentManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], FeeComponentManagementService);
exports.FeeComponentManagementService = FeeComponentManagementService;
//# sourceMappingURL=student-management-fee-component.service.js.map