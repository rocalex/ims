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
const institute_management_subject_service_1 = require("../institute-management-subject.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const institute_management_subject_model_1 = require("../institute-management-subject.model");
let EditDetailsSubjectManagementComponent = class EditDetailsSubjectManagementComponent {
    constructor(subjectManagementService, loaderService, router, snackBar) {
        this.subjectManagementService = subjectManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.updateSubject = new institute_management_subject_model_1.UpdateInstituteSubject();
        this.error = new institute_management_subject_model_1.InstituteSubjectResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.subjectId = +(path[3]);
        this.getInstituteSubjectDetails();
    }
    getInstituteSubjectDetails() {
        this.loaderService.toggleLoader(true);
        this.subjectManagementService.getInstituteSubjectDetails(this.subjectId).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['institute', 'subject', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.updateSubject.Code = response.code;
                this.updateSubject.IsGroup = response.isGroup;
                this.updateSubject.Name = response.name;
                this.updateSubject.Description = response.description;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    hasError(fieldName) {
        var id = institute_management_subject_model_1.InstituteSubjectResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = institute_management_subject_model_1.InstituteSubjectResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new institute_management_subject_model_1.InstituteSubjectResponse();
        }
    }
    updateInstituteSubject() {
        this.loaderService.toggleLoader(true);
        this.updateSubject.Id = this.subjectId;
        this.subjectManagementService.updateInstituteSubject(this.updateSubject).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['institute', 'subject', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
EditDetailsSubjectManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-subject-edit-details.html'
    }),
    __metadata("design:paramtypes", [institute_management_subject_service_1.SubjectManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditDetailsSubjectManagementComponent);
exports.EditDetailsSubjectManagementComponent = EditDetailsSubjectManagementComponent;
//# sourceMappingURL=institute-management-subject-edit-details.js.map