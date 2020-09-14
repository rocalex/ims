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
const transport_management_breakdown_service_1 = require("../transport-management-breakdown.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const transport_management_breakdown_model_1 = require("../transport-management-breakdown.model");
let EditAndDetailTransportManagementBreakDownComponent = class EditAndDetailTransportManagementBreakDownComponent {
    constructor(transportManagementBreakDownService, activeRoute, loaderService, snackBar, router) {
        this.transportManagementBreakDownService = transportManagementBreakDownService;
        this.activeRoute = activeRoute;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.currentDate = new Date();
        this.initialData = {};
        this.addBreakDown = new transport_management_breakdown_model_1.UpdateVehicleBreakDownManagementAc();
        this.error = new transport_management_breakdown_model_1.VehicleBreakDownManagementResponse();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addBreakDown.Id = +res.id);
        this.getInitialData();
        this.getBreakDown();
    }
    getBreakDown() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.getBreakDown(this.addBreakDown.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'breakdown', 'list']);
            }
            else {
                this.addBreakDown.Code = response.code;
                this.addBreakDown.BreakDownDuration = response.breakDownDuration;
                this.addBreakDown.BreakDownDate = response.breakDownDate;
                this.addBreakDown.Address = response.address;
                this.addBreakDown.VehicleId = response.vehicleId;
                this.addBreakDown.DriverId = response.driverId;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    updateBreakDown() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.updateBreakDown(this.addBreakDown).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'breakdown', 'list']);
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
        var id = transport_management_breakdown_model_1.VehicleBreakDownManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_breakdown_model_1.VehicleBreakDownManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_breakdown_model_1.VehicleBreakDownManagementResponse();
        }
    }
    isDriverAllowed(id) {
        if (this.initialData.vehicleDriverMappings) {
            if (this.addBreakDown.VehicleId) {
                var driver = this.initialData.vehicleDriverMappings.find(x => x.driverId === id && x.vehicleId === this.addBreakDown.VehicleId);
                if (driver) {
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
    resetDriver() {
        if (this.addBreakDown.DriverId) {
            this.addBreakDown.DriverId = undefined;
        }
    }
};
EditAndDetailTransportManagementBreakDownComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-breakdown-edit-detail.html'
    }),
    __metadata("design:paramtypes", [transport_management_breakdown_service_1.TransportManagementBreakDownService, router_1.ActivatedRoute,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router])
], EditAndDetailTransportManagementBreakDownComponent);
exports.EditAndDetailTransportManagementBreakDownComponent = EditAndDetailTransportManagementBreakDownComponent;
//# sourceMappingURL=transport-management-breakdown-edit.component.js.map