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
const loader_service_1 = require("../../../../../shared/loader-service");
const student_management_examdefinition_service_1 = require("../student-management-examdefinition.service");
const student_management_lookup_model_1 = require("../../../student-management-lookup/student-management-lookup.model");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
let AddStudentManagementExamDefinitionComponent = class AddStudentManagementExamDefinitionComponent {
    constructor(studentManagementExamDefinitionService, loaderService, router, snackBar) {
        this.studentManagementExamDefinitionService = studentManagementExamDefinitionService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
    }
    addInstituteExamDefinition() {
        this.loaderService.toggleLoader(true);
        this.studentManagementExamDefinitionService.addInstituteExamDefinition(this.baseModel).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'mark', 'examdefinition', 'list']);
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
    hasError(fieldName) {
        var id = student_management_lookup_model_1.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = student_management_lookup_model_1.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new student_management_lookup_model_1.LookUpResponse();
        }
    }
};
AddStudentManagementExamDefinitionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-examdefinition-add.html'
    }),
    __metadata("design:paramtypes", [student_management_examdefinition_service_1.StudentManagementExamDefinitionService,
        loader_service_1.LoaderService, router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentManagementExamDefinitionComponent);
exports.AddStudentManagementExamDefinitionComponent = AddStudentManagementExamDefinitionComponent;
//# sourceMappingURL=student-management-examdefinition-add.component.js.map