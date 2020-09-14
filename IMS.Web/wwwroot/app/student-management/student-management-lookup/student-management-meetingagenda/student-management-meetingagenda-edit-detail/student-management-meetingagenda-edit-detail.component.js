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
const student_management_meetingagenda_service_1 = require("../student-management-meetingagenda.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailMeetingAgendaManagementComponent = class EditAndDetailMeetingAgendaManagementComponent {
    constructor(meetingagendaManagementService, loaderService, router, snackBar) {
        this.meetingagendaManagementService = meetingagendaManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.meetingagendaId = +(path[4]);
        this.getInstituteMeetingAgendaDetail();
    }
    getInstituteMeetingAgendaDetail() {
        this.loaderService.toggleLoader(true);
        this.meetingagendaManagementService.getInstituteMeetingAgendaDetail(this.meetingagendaId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'meetingagenda', 'list']);
            }
            else {
                this.baseModel.Name = response.name;
                this.baseModel.Code = response.code;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteMeetingAgenda(updateMeetingAgenda) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateMeetingAgenda.Name, Code: updateMeetingAgenda.Code, MeetingAgendaId: this.meetingagendaId,
            Description: updateMeetingAgenda.Description, Status: updateMeetingAgenda.Status
        };
        this.meetingagendaManagementService.updateInstituteMeetingAgenda(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'meetingagenda', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error = new student_management_lookup_model_1.LookUpResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailMeetingAgendaManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-meetingagenda-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_meetingagenda_service_1.MeetingAgendaManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailMeetingAgendaManagementComponent);
exports.EditAndDetailMeetingAgendaManagementComponent = EditAndDetailMeetingAgendaManagementComponent;
//# sourceMappingURL=student-management-meetingagenda-edit-detail.component.js.map