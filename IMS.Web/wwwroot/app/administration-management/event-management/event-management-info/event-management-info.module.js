"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const event_management_info_service_1 = require("./event-management-info.service");
const event_management_info_component_1 = require("./event-management-info.component");
const event_management_info_list_component_1 = require("./event-management-info-list/event-management-info-list.component");
const event_management_info_add_component_1 = require("./event-management-info-add/event-management-info-add.component");
const event_management_info_edit_detail_component_1 = require("./event-management-info-edit-detail/event-management-info-edit-detail.component");
let EventManagementInfoModule = class EventManagementInfoModule {
};
EventManagementInfoModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            event_management_info_component_1.EventManagementInfoComponent,
            event_management_info_list_component_1.ListEventManagementComponent,
            event_management_info_add_component_1.AddEventManagementComponent,
            event_management_info_edit_detail_component_1.EditDetailEventManagementComponent
        ],
        providers: [
            event_management_info_service_1.EventManagementService
        ],
    })
], EventManagementInfoModule);
exports.EventManagementInfoModule = EventManagementInfoModule;
//# sourceMappingURL=event-management-info.module.js.map