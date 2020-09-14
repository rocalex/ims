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
const http_service_1 = require("../core/http.service");
let PermissionAuthGuard = class PermissionAuthGuard {
    constructor(httpService) {
        this.httpService = httpService;
    }
    canActivate(next, state) {
        var parent = next.data.parent;
        var child = next.data.child;
        var type = next.data.type;
        return this.isAllowedToUse(parent, child, type).then(res => {
            return res.json();
        });
    }
    isAllowedToUse(parent, child, type) {
        return this.httpService.get('api/home/permission' + '/' + parent + '/' + child + '/' + type);
    }
};
PermissionAuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], PermissionAuthGuard);
exports.PermissionAuthGuard = PermissionAuthGuard;
//# sourceMappingURL=permissions-route.guard.js.map