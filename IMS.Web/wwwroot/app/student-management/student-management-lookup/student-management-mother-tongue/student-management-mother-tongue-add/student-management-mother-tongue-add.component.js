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
let AddMotherTongueManagementComponent = class AddMotherTongueManagementComponent {
    constructor(motherTongueManagementService, loaderService, router, snackBar) {
        this.motherTongueManagementService = motherTongueManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() { }
    addMotherTongue(addMotherTongue) {
        this.loaderService.toggleLoader(true);
        this.motherTongueManagementService.addMotherTongue(addMotherTongue)
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
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
            console.log(err.json());
        });
    }
};
AddMotherTongueManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-mother-tongue-add.html'
    }),
    __metadata("design:paramtypes", [student_management_mother_tongue_service_1.MotherTongueManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService])
], AddMotherTongueManagementComponent);
exports.AddMotherTongueManagementComponent = AddMotherTongueManagementComponent;
//# sourceMappingURL=student-management-mother-tongue-add.component.js.map