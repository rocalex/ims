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
const router_1 = require("@angular/router");
const staff_management_disciplinary_service_1 = require("../staff-management-disciplinary.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const staff_management_disciplinary_model_1 = require("../staff-management-disciplinary.model");
let EditAndDetailStaffDisciplinaryManagementComponent = class EditAndDetailStaffDisciplinaryManagementComponent {
    constructor(staffDisciplinaryManagementService, loaderService, snackBar, router, activeRoute) {
        this.staffDisciplinaryManagementService = staffDisciplinaryManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.activeRoute = activeRoute;
        this.initialData = {};
        this.disciplinary = new staff_management_disciplinary_model_1.UpdateDisciplinaryManagementAc();
        this.todayDate = new Date();
    }
    ngOnInit() {
        this.getInitialData();
        this.activeRoute.params.subscribe(res => this.disciplinary.Id = +res.id);
        this.getDisciplinary();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getDisciplinary() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.getDisciplinary(this.disciplinary.Id).then(res => {
            var response = res.json();
            if (response) {
                this.disciplinary.Date = response.date;
                this.disciplinary.Description = response.description;
                this.disciplinary.Remarks = response.remarks;
                this.disciplinary.StatusId = response.statusId;
                this.disciplinary.Subject = response.subject;
                this.disciplinary.StudentId = response.studentId;
            }
            else {
                this.snackBar.showSnackbar('Disciplinary not found');
                this.router.navigate(['staff', 'activities', 'disciplinary', 'list']);
            }
            this.loaderService.toggleLoader(false);
        });
    }
    isRemarkDisbale() {
        if (this.disciplinary.StatusId) {
            if (this.initialData.statuses) {
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
        else {
            return false;
        }
    }
    updateDisciplinary() {
        this.loaderService.toggleLoader(true);
        this.staffDisciplinaryManagementService.updateDisciplinary(this.disciplinary).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['staff', 'activities', 'disciplinary', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailStaffDisciplinaryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-disciplinary-edit-detail.html'
    }),
    __metadata("design:paramtypes", [staff_management_disciplinary_service_1.StaffDisciplinaryManagementService,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router,
        router_1.ActivatedRoute])
], EditAndDetailStaffDisciplinaryManagementComponent);
exports.EditAndDetailStaffDisciplinaryManagementComponent = EditAndDetailStaffDisciplinaryManagementComponent;
//# sourceMappingURL=staff-management-disciplinary-edit.component.js.map