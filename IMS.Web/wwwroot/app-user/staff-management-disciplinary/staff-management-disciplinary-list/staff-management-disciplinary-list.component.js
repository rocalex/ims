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
const staff_management_disciplinary_service_1 = require("../staff-management-disciplinary.service");
const loader_service_1 = require("../../../shared/loader-service");
let ListStaffDisciplinaryManagementComponent = class ListStaffDisciplinaryManagementComponent {
    constructor(staffDisciplinaryManagementService, loaderService) {
        this.staffDisciplinaryManagementService = staffDisciplinaryManagementService;
        this.loaderService = loaderService;
        this.disciplinaries = [];
    }
    ngOnInit() {
        this.getDisciplinaries();
    }
    getDisciplinaries() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.getDisciplinaries().then(res => {
            this.disciplinaries = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
};
ListStaffDisciplinaryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-disciplinary-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_disciplinary_service_1.StaffDisciplinaryManagementService,
        loader_service_1.LoaderService])
], ListStaffDisciplinaryManagementComponent);
exports.ListStaffDisciplinaryManagementComponent = ListStaffDisciplinaryManagementComponent;
//# sourceMappingURL=staff-management-disciplinary-list.component.js.map