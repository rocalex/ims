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
const shared_service_1 = require("../../../shared/shared.service");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
let StudentManagementMarkComponent = class StudentManagementMarkComponent {
    constructor(sharedService) {
        this.sharedService = sharedService;
        this.permissions = [];
    }
    ngOnInit() {
        this.sharedService.permission.subscribe(res => {
            this.permissions = res;
        });
    }
    isAllowed(name) {
        if (this.permissions.length) {
            var data = this.permissions.find(x => x.userGroupFeatureParent === sidenav_model_1.UserGroupFeatureParentEnum.Student
                && x.userGroupFeatureChild === sidenav_model_1.UserGroupFeatureChildEnum[name]);
            if (data) {
                return data.canView;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
StudentManagementMarkComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-mark.html'
    }),
    __metadata("design:paramtypes", [shared_service_1.SharedService])
], StudentManagementMarkComponent);
exports.StudentManagementMarkComponent = StudentManagementMarkComponent;
//# sourceMappingURL=student-management-mark.component.js.map