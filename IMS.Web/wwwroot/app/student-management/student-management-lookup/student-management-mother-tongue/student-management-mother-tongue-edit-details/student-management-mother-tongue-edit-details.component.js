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
const student_management_mother_tongue_service_1 = require("../student-management-mother-tongue.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditDetailsMotherTongueManagementComponent = class EditDetailsMotherTongueManagementComponent {
    constructor(motherTongueManagementService, loader, router, activatedRoute, snackBar) {
        this.motherTongueManagementService = motherTongueManagementService;
        this.loader = loader;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.motherTongue = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
        this.activatedRoute.params.subscribe(param => this.motherTongueId = param.id);
    }
    ngOnInit() {
        this.getMotherTongue();
    }
    getMotherTongue() {
        this.loader.toggleLoader(true);
        this.motherTongueManagementService.getMotherTongueDetail(this.motherTongueId)
            .then(res => {
            let response = res.json();
            this.motherTongue.Code = response.code;
            this.motherTongue.Name = response.name;
            this.motherTongue.Description = response.description;
            this.motherTongue.Status = response.status;
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
    updateMotherTongue(updatedMotherTongue) {
        let updatedData = {
            Name: updatedMotherTongue.Name, Code: updatedMotherTongue.Code, Id: this.motherTongueId,
            Description: updatedMotherTongue.Description, Status: updatedMotherTongue.Status
        };
        this.loader.toggleLoader(true);
        this.motherTongueManagementService.updateMotherTongue(updatedData)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'mothertongue', 'list']);
            }
            else {
                this.error = new student_management_lookup_model_1.LookUpResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
};
EditDetailsMotherTongueManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-mother-tongue-edit-details.html'
    }),
    __metadata("design:paramtypes", [student_management_mother_tongue_service_1.MotherTongueManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService])
], EditDetailsMotherTongueManagementComponent);
exports.EditDetailsMotherTongueManagementComponent = EditDetailsMotherTongueManagementComponent;
//# sourceMappingURL=student-management-mother-tongue-edit-details.component.js.map