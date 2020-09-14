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
const user_component_1 = require("./user.component");
const user_list_component_1 = require("./user-list/user-list.component");
const user_add_component_1 = require("./user-add/user-add.component");
const user_edit_details_component_1 = require("./user-edit-details/user-edit-details.component");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            user_component_1.UserComponent,
            user_list_component_1.UserListComponent,
            user_add_component_1.UserAddComponent,
            user_edit_details_component_1.UserEditDetailsComponent
        ],
        providers: [
            user_service_1.UserService
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map