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
let StaffManagementService = class StaffManagementService {
    constructor(http) {
        this.http = http;
        this.StaffManagementUrl = 'api/staffmanagement';
    }
    addStaffDetail(designation) {
        return this.http.post(this.StaffManagementUrl, designation);
    }
    getAllStaffByInsituteId() {
        return this.http.get(this.StaffManagementUrl);
    }
    getStaffDetail(staffId) {
        return this.http.get(this.StaffManagementUrl + '/' + staffId);
    }
    getInitialDataForAddOrEditStaff() {
        return this.http.get(this.StaffManagementUrl + '/bundle');
    }
    updateStaff(designation) {
        return this.http.put(this.StaffManagementUrl, designation);
    }
    addOrUpdateStaffImage(staffId, formData) {
        return this.http.postForFormData(this.StaffManagementUrl + '/image/' + staffId, formData);
    }
    archiveStaff(staffId) {
        return this.http.delete(this.StaffManagementUrl + '/' + staffId);
    }
    addOrUpdateStaffGallery(staffId, formData) {
        return this.http.postForFormData(this.StaffManagementUrl + '/gallery/' + staffId, formData);
    }
    getAutoSequenceNumberByTypeAndInstituteId() {
        return this.http.get('api/autosequencegeneratormanagement/generator/Employee Id');
    }
    importExcelData(formData) {
        return this.http.postForFormData(this.StaffManagementUrl + '/import', formData);
    }
    addOrUpdateStaffDocument(staffId, formData) {
        return this.http.postForFormData(this.StaffManagementUrl + '/document/' + staffId, formData);
    }
    updateDocumentData(updateDocumentData, staffId) {
        return this.http.put(this.StaffManagementUrl + '/documentdata/' + staffId, updateDocumentData);
    }
};
StaffManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StaffManagementService);
exports.StaffManagementService = StaffManagementService;
//# sourceMappingURL=staff-management-information.service.js.map