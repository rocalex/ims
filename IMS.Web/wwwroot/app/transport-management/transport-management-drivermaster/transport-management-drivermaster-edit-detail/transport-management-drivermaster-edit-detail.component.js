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
const transport_management_drivermaster_service_1 = require("../transport-management-drivermaster.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const transport_management_drivermaster_model_1 = require("../transport-management-drivermaster.model");
let EditAndDetailTransportManagementDriverMasterComponent = class EditAndDetailTransportManagementDriverMasterComponent {
    constructor(driverMasterService, loaderService, router, snackBar, activeRoute) {
        this.driverMasterService = driverMasterService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.currentDate = new Date();
        this.addDriver = new transport_management_drivermaster_model_1.UpdateDriverMasterManagementAc();
        this.error = new transport_management_drivermaster_model_1.DriverMasterManagementResponse();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addDriver.Id = res.id);
        this.getDriverMaster();
    }
    getDriverMaster() {
        this.loaderService.toggleLoader(true);
        this.driverMasterService.getDriverMaster(this.addDriver.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'drivermaster', 'list']);
            }
            else {
                this.addDriver.Address = response.address;
                this.addDriver.DateOfBirth = response.dateOfBirth;
                this.addDriver.DateOfIssue = response.dateOfIssue;
                this.addDriver.IsDriver = response.isDriver;
                this.addDriver.IssuingAuthority = response.issuingAuthority;
                this.addDriver.LicenseNumber = response.licenseNumber;
                this.addDriver.LicenseType = response.licenseType;
                this.addDriver.MobileNumber = response.mobileNumber;
                this.addDriver.Name = response.name;
                this.addDriver.PlaceOfIssue = response.placeOfIssue;
                this.addDriver.Salary = response.salary;
                this.addDriver.ValidityTill = response.validityTill;
                if (response.licensePhoto) {
                    this.imgURL = response.licensePhoto;
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateDriverMaster() {
        this.loaderService.toggleLoader(true);
        this.driverMasterService.updateDriverMaster(this.addDriver).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addImage(this.addDriver.Id, response.message);
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
        var id = transport_management_drivermaster_model_1.DriverMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_drivermaster_model_1.DriverMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_drivermaster_model_1.DriverMasterManagementResponse();
        }
    }
    preview(files) {
        if (files.length === 0)
            return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        };
    }
    addImage(id, message) {
        this.loaderService.toggleLoader(true);
        const formData = new FormData();
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            for (const file of files) {
                formData.append(file.name, file);
            }
        }
        this.driverMasterService.addImages(id, formData).then(res => {
            this.snackBar.showSnackbar(message);
            this.router.navigate(['transportmanagement', 'drivermaster', 'list']);
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailTransportManagementDriverMasterComponent.prototype, "fileInput", void 0);
EditAndDetailTransportManagementDriverMasterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-drivermaster-edit-detail.html'
    }),
    __metadata("design:paramtypes", [transport_management_drivermaster_service_1.DriverMasterService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailTransportManagementDriverMasterComponent);
exports.EditAndDetailTransportManagementDriverMasterComponent = EditAndDetailTransportManagementDriverMasterComponent;
//# sourceMappingURL=transport-management-drivermaster-edit-detail.component.js.map