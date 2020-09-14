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
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const staff_management_disciplinary_model_1 = require("../staff-management-disciplinary.model");
let AddStaffDisciplinaryManagementComponent = class AddStaffDisciplinaryManagementComponent {
    constructor(staffDisciplinaryManagementService, loaderService, snackBar, router) {
        this.staffDisciplinaryManagementService = staffDisciplinaryManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.initialData = {};
        this.disciplinary = new staff_management_disciplinary_model_1.AddDisciplinaryManagementAc();
        this.students = [];
        this.todayDate = new Date();
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.getInitialData().then(res => {
            this.initialData = res.json();
            this.disciplinary.StatusId = (this.initialData.statuses.find(x => x.code === 'Open')).id;
            this.loaderService.toggleLoader(false);
        });
    }
    isDisabledClass(classId) {
        if (this.disciplinary.StaffId) {
            var staffClasses = this.initialData.classSubjectMapping.filter(x => x.facultyId === this.disciplinary.StaffId
                || x.alternateFacultyId === this.disciplinary.StaffId);
            var classForStaff = staffClasses.find(x => x.classId === classId);
            if (classForStaff) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
    resetStudent() {
        this.students = [];
    }
    searchStudent() {
        this.students = this.initialData.students.filter(x => x.currentClassId === this.disciplinary.ClassId
            && x.sectionId === this.disciplinary.SectionId);
    }
    isRemarkDisbale() {
        if (this.disciplinary.StatusId) {
            var status = this.initialData.statuses.find(x => x.id === this.disciplinary.StatusId);
            if (status.name === 'Open') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    addDisciplinary() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.addDisciplinary(this.disciplinary).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['staff', 'activities', 'disciplinary', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
AddStaffDisciplinaryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-disciplinary-add.html'
    }),
    __metadata("design:paramtypes", [staff_management_disciplinary_service_1.StaffDisciplinaryManagementService,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router])
], AddStaffDisciplinaryManagementComponent);
exports.AddStaffDisciplinaryManagementComponent = AddStaffDisciplinaryManagementComponent;
//# sourceMappingURL=staff-management-disciplinary-add.component.js.map