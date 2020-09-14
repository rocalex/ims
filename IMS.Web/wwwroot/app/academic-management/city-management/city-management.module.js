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
const city_management_component_1 = require("./city-management.component");
const city_management_service_1 = require("./city-management.service");
const city_management_add_component_1 = require("./city-management-add/city-management-add.component");
const city_management_edit_detail_component_1 = require("./city-management-edit-detail/city-management-edit-detail.component");
const city_management_list_component_1 = require("./city-management-list/city-management-list.component");
const table_1 = require("@angular/material/table");
const paginator_1 = require("@angular/material/paginator");
let CityManagementModule = class CityManagementModule {
};
CityManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            //CityManagementRouting,
            table_1.MatTableModule,
            paginator_1.MatPaginatorModule
        ],
        declarations: [
            city_management_component_1.CityManagementComponent,
            city_management_add_component_1.AddCityManagementComponent,
            city_management_edit_detail_component_1.EditAndDetailCityManagementComponent,
            city_management_list_component_1.ListCityManagementComponent
        ],
        providers: [
            city_management_service_1.CityManagementService
        ],
    })
], CityManagementModule);
exports.CityManagementModule = CityManagementModule;
//# sourceMappingURL=city-management.module.js.map