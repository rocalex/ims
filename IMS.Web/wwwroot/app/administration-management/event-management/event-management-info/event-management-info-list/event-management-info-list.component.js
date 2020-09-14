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
const loader_service_1 = require("../../../../../shared/loader-service");
const event_management_info_service_1 = require("../event-management-info.service");
const event_management_model_1 = require("../../event-management.model");
const permission_service_1 = require("../../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
let ListEventManagementComponent = class ListEventManagementComponent {
    constructor(loaderService, permissionService, eventManagementService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.eventManagementService = eventManagementService;
        this.eventInfoList = [];
        this.eventInfoPriorityEnumDetails = [
            { key: event_management_model_1.EventManagementInfoPriorityEnum.High, value: 'High' },
            { key: event_management_model_1.EventManagementInfoPriorityEnum.Medium, value: 'Medium' },
            { key: event_management_model_1.EventManagementInfoPriorityEnum.Low, value: 'Low' }
        ];
    }
    ngOnInit() {
        this.getEventInfoList();
    }
    getEventInfoList() {
        this.loaderService.toggleLoader(true);
        this.eventManagementService.getEventInfoList()
            .then(res => {
            this.eventInfoList = res.json();
            this.eventInfoList.forEach(eventInfo => {
                eventInfo.priorityName = this.eventInfoPriorityEnumDetails.filter(x => x.key == eventInfo.priority)[0].value;
            });
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.AcademicEvent, type);
    }
};
ListEventManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'event-management-info-list.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService, permission_service_1.PermissionService,
        event_management_info_service_1.EventManagementService])
], ListEventManagementComponent);
exports.ListEventManagementComponent = ListEventManagementComponent;
//# sourceMappingURL=event-management-info-list.component.js.map