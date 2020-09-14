"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const lookup_route_1 = require("./lookup.route");
const lookup_component_1 = require("./lookup.component");
const lookup_service_1 = require("./lookup.service");
const edit_component_1 = require("./roomtype/edit/edit.component");
const add_component_1 = require("./roomtype/add/add.component");
const list_component_1 = require("./roomtype/list/list.component");
const edit_component_2 = require("./bedstatus/edit/edit.component");
const add_component_2 = require("./bedstatus/add/add.component");
const list_component_2 = require("./bedstatus/list/list.component");
let LookupModule = class LookupModule {
};
LookupModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            lookup_route_1.LookupRouting
        ],
        declarations: [
            lookup_component_1.LookupComponent,
            edit_component_1.RoomTypeEditComponent,
            add_component_1.RoomTypeAddComponent,
            list_component_1.RoomTypeListComponent,
            edit_component_2.BedStatusEditComponent,
            add_component_2.BedStatusAddComponent,
            list_component_2.BedStatusListComponent
        ],
        providers: [
            core_1.forwardRef(() => lookup_service_1.LookupService)
        ]
    })
], LookupModule);
exports.LookupModule = LookupModule;
//# sourceMappingURL=lookup.module.js.map