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
const transport_management_repair_service_1 = require("../transport-management-repair.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const transport_management_repair_model_1 = require("../transport-management-repair.model");
let EditAndDetailTransportManagementRepairComponent = class EditAndDetailTransportManagementRepairComponent {
    constructor(transportManagementRepairService, activeRoute, loaderService, snackBar, router) {
        this.transportManagementRepairService = transportManagementRepairService;
        this.activeRoute = activeRoute;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.initialData = {};
        this.addRepair = new transport_management_repair_model_1.UpdateVehicleRepairManagementAc();
        this.error = new transport_management_repair_model_1.VehicleRepairManagementResponse();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addRepair.Id = +res.id);
        this.getInitialData();
        this.getRepair();
    }
    getRepair() {
        this.loaderService.toggleLoader(true);
        this.transportManagementRepairService.getRepair(this.addRepair.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'repair', 'list']);
            }
            else {
                this.addRepair.Code = response.code;
                this.addRepair.RepairCost = response.repairCost;
                this.addRepair.RepairDate = response.repairDate;
                this.addRepair.Remarks = response.remarks;
                this.addRepair.VehicleId = response.vehicleId;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementRepairService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    updateRepair() {
        this.loaderService.toggleLoader(true);
        this.transportManagementRepairService.updateRepair(this.addRepair).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'repair', 'list']);
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
        var id = transport_management_repair_model_1.VehicleRepairManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_repair_model_1.VehicleRepairManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_repair_model_1.VehicleRepairManagementResponse();
        }
    }
};
EditAndDetailTransportManagementRepairComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-repair-edit-detail.html'
    }),
    __metadata("design:paramtypes", [transport_management_repair_service_1.TransportManagementRepairService, router_1.ActivatedRoute,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService, router_1.Router])
], EditAndDetailTransportManagementRepairComponent);
exports.EditAndDetailTransportManagementRepairComponent = EditAndDetailTransportManagementRepairComponent;
//# sourceMappingURL=transport-management-repair-edit.component.js.map