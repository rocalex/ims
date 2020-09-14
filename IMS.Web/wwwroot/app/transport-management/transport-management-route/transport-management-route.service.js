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
let RouteService = class RouteService {
    constructor(http) {
        this.http = http;
        this.RouteManagementUrl = 'api/routemanagement';
    }
    addRoute(route) {
        return this.http.post(this.RouteManagementUrl, route);
    }
    getRoutes() {
        return this.http.get(this.RouteManagementUrl);
    }
    getRoute(routeId) {
        return this.http.get(this.RouteManagementUrl + '/' + routeId);
    }
    updateRoute(route) {
        return this.http.put(this.RouteManagementUrl, route);
    }
    getInitialData() {
        return this.http.get(this.RouteManagementUrl + '/initialdata');
    }
};
RouteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], RouteService);
exports.RouteService = RouteService;
//# sourceMappingURL=transport-management-route.service.js.map