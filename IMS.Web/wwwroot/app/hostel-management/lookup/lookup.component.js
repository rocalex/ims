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
const router_1 = require("@angular/router");
const permission_service_1 = require("../../../shared/permission.service");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
let LookupComponent = class LookupComponent {
    constructor(permissionService, router) {
        this.permissionService = permissionService;
        this.router = router;
        this.lookupTypes = ["Room Types", "Bed Status"];
        this.lookupType = "";
    }
    ngOnInit() {
    }
    redirect(value) {
        if (value == this.lookupTypes[0]) {
            this.router.navigate(['hostel', 'lookup', 'roomtype']);
        }
        else {
            this.router.navigate(['hostel', 'lookup', 'bedstatus']);
        }
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
LookupComponent = __decorate([
    core_1.Component({
        selector: 'app-lookup',
        templateUrl: './lookup.component.html'
    }),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        router_1.Router])
], LookupComponent);
exports.LookupComponent = LookupComponent;
//# sourceMappingURL=lookup.component.js.map