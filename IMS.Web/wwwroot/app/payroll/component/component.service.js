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
let ComponentService = class ComponentService {
    constructor(http) {
        this.http = http;
        this.componentGroupManagementUrl = 'api/componentgroup';
        this.componentManagementUrl = 'api/component';
    }
    getComponentGroupsForLoggedInUser() {
        return this.http.get(this.componentGroupManagementUrl);
    }
    getComponentsForLoggedInUser() {
        return this.http.get(this.componentManagementUrl);
    }
    getComponentGroupById(id) {
        return this.http.get(this.componentManagementUrl + `/${id}`);
    }
    addComponentGroup(componentGroup) {
        return this.http.post(this.componentManagementUrl, componentGroup);
    }
    updateComponentGroup(componentGroup) {
        return this.http.put(this.componentManagementUrl, componentGroup);
    }
    deleteComponentGroup(componentGroupId) {
        return this.http.delete(this.componentManagementUrl + '/' + componentGroupId);
    }
};
ComponentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], ComponentService);
exports.ComponentService = ComponentService;
//# sourceMappingURL=component.service.js.map