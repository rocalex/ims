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
const transport_management_maintenance_service_1 = require("../transport-management-maintenance.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const transport_management_maintenance_model_1 = require("../transport-management-maintenance.model");
let AddTransportManagementMaintenanceComponent = class AddTransportManagementMaintenanceComponent {
    constructor(transportManagementMaintenanceService, loaderService, snackBar, router) {
        this.transportManagementMaintenanceService = transportManagementMaintenanceService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.currentDate = new Date();
        this.initialData = {};
        this.addMaintenance = new transport_management_maintenance_model_1.AddVehicleMaintenanceManagementAc();
        this.error = new transport_management_maintenance_model_1.VehicleMaintenanceManagementResponse();
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementMaintenanceService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addMaintenanceData() {
        this.loaderService.toggleLoader(true);
        this.addMaintenance.MaintenanceDate = this.convertDateToUtc(this.addMaintenance.MaintenanceDate);
        this.addMaintenance.NextMaintenanceDate = this.convertDateToUtc(this.addMaintenance.NextMaintenanceDate);
        this.transportManagementMaintenanceService.addMaintenance(this.addMaintenance).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'maintenance', 'list']);
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
        var id = transport_management_maintenance_model_1.VehicleMaintenanceManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_maintenance_model_1.VehicleMaintenanceManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_maintenance_model_1.VehicleMaintenanceManagementResponse();
        }
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
AddTransportManagementMaintenanceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-maintenance-add.html'
    }),
    __metadata("design:paramtypes", [transport_management_maintenance_service_1.TransportManagementMaintenanceService,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router])
], AddTransportManagementMaintenanceComponent);
exports.AddTransportManagementMaintenanceComponent = AddTransportManagementMaintenanceComponent;
//# sourceMappingURL=transport-management-maintenance-add.component.js.map