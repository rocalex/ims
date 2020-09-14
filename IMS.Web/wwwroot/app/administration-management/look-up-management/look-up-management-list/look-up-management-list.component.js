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
const look_up_management_service_1 = require("../look-up-management.service");
const loader_service_1 = require("../../../../shared/loader-service");
let ListLookUpManagementComponent = class ListLookUpManagementComponent {
    constructor(lookUpManagementService, loaderService) {
        this.lookUpManagementService = lookUpManagementService;
        this.loaderService = loaderService;
        this.lookUps = [];
    }
    ngOnInit() {
        this.getAllLookUpMapping();
    }
    getAllLookUpMapping() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getAllLookUpMapping().then(res => {
            this.lookUps = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
};
ListLookUpManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'look-up-management-list.html'
    }),
    __metadata("design:paramtypes", [look_up_management_service_1.LookUpManagementService, loader_service_1.LoaderService])
], ListLookUpManagementComponent);
exports.ListLookUpManagementComponent = ListLookUpManagementComponent;
//# sourceMappingURL=look-up-management-list.component.js.map