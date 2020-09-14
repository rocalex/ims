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
const institute_management_subject_model_1 = require("../institute-management-subject.model");
const institute_management_subject_service_1 = require("../institute-management-subject.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let AddSubjectManagementComponent = class AddSubjectManagementComponent {
    constructor(subjectManagementService, loaderService, router, snackBar) {
        this.subjectManagementService = subjectManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.addSubject = new institute_management_subject_model_1.AddInstituteSubject();
        this.error = new institute_management_subject_model_1.InstituteSubjectResponse();
    }
    ngOnInit() {
    }
    addInstituteSubject() {
        this.loaderService.toggleLoader(true);
        this.subjectManagementService.addInstituteSubject(this.addSubject).then(res => {
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
};
AddSubjectManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-subject-add.html'
    }),
    __metadata("design:paramtypes", [institute_management_subject_service_1.SubjectManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddSubjectManagementComponent);
exports.AddSubjectManagementComponent = AddSubjectManagementComponent;
//# sourceMappingURL=institute-management-subject-add.component.js.map