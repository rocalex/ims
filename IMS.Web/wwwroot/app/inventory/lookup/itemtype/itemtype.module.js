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
const itemtype_component_1 = require("./itemtype.component");
const itemtype_route_1 = require("./itemtype.route");
const add_component_1 = require("./add/add.component");
const edit_component_1 = require("./edit/edit.component");
const list_component_1 = require("./list/list.component");
const itemtype_service_1 = require("./itemtype.service");
let ItemTypeModule = class ItemTypeModule {
};
ItemTypeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            itemtype_route_1.ItemTypeRouting,
        ],
        declarations: [
            itemtype_component_1.ItemTypeComponent,
            add_component_1.AddComponent,
            edit_component_1.EditComponent,
            list_component_1.ListComponent
        ],
        providers: [
            core_1.forwardRef(() => itemtype_service_1.ItemTypeService)
        ]
    })
], ItemTypeModule);
exports.ItemTypeModule = ItemTypeModule;
//# sourceMappingURL=itemtype.module.js.map