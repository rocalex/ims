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
const student_management_language_service_1 = require("../student-management-language.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailLanguageManagementComponent = class EditAndDetailLanguageManagementComponent {
    constructor(languageManagementService, loaderService, router, snackBar) {
        this.languageManagementService = languageManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.language = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.languageId = +(path[4]);
        this.getInstituteLanguageDetail();
    }
    getInstituteLanguageDetail() {
        this.loaderService.toggleLoader(true);
        this.languageManagementService.getInstituteLanguageDetail(this.languageId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'language', 'list']);
            }
            else {
                this.language.Code = response.code;
                this.language.Name = response.name;
                this.language.Description = response.description;
                this.language.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteLanguage(updateLanguage) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateLanguage.Name, Code: updateLanguage.Code, Id: this.languageId,
            Description: updateLanguage.Description, Status: updateLanguage.Status
        };
        this.languageManagementService.updateInstituteLanguage(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'language', 'list']);
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
EditAndDetailLanguageManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-language-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_language_service_1.LanguageManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailLanguageManagementComponent);
exports.EditAndDetailLanguageManagementComponent = EditAndDetailLanguageManagementComponent;
//# sourceMappingURL=student-management-language-edit-detail.component.js.map