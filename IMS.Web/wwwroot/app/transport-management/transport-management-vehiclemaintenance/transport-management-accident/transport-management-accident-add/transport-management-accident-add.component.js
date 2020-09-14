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
const transport_management_accident_service_1 = require("../transport-management-accident.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const transport_management_accident_model_1 = require("../transport-management-accident.model");
let AddTransportManagementAccidentComponent = class AddTransportManagementAccidentComponent {
    constructor(transportManagementAccidentService, loaderService, snackBar, router) {
        this.transportManagementAccidentService = transportManagementAccidentService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.currentDate = new Date();
        this.initialData = {};
        this.addAccident = new transport_management_accident_model_1.AddVehicleAccidentManagementAc();
        this.error = new transport_management_accident_model_1.VehicleAccidentManagementResponse();
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addAccidentData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.addAccident(this.addAccident).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'accident', 'list']);
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
        var id = transport_management_accident_model_1.VehicleAccidentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_accident_model_1.VehicleAccidentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_accident_model_1.VehicleAccidentManagementResponse();
        }
    }
    isDriverAllowed(id) {
        if (this.initialData.vehicleDriverMappings) {
            if (this.addAccident.VehicleId) {
                var driver = this.initialData.vehicleDriverMappings.find(x => x.driverId === id && x.vehicleId === this.addAccident.VehicleId);
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
        if (this.addAccident.DriverId) {
            this.addAccident.DriverId = undefined;
        }
    }
};
AddTransportManagementAccidentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-accident-add.html'
    }),
    __metadata("design:paramtypes", [transport_management_accident_service_1.TransportManagementAccidentService,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router])
], AddTransportManagementAccidentComponent);
exports.AddTransportManagementAccidentComponent = AddTransportManagementAccidentComponent;
//# sourceMappingURL=transport-management-accident-add.component.js.map