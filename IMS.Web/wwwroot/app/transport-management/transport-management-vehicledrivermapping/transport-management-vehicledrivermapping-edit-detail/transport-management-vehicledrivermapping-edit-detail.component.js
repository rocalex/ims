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
const transport_management_vehicledrivermapping_service_1 = require("../transport-management-vehicledrivermapping.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let EditAndDetailTransportManagementVehicleDriverMappingComponent = class EditAndDetailTransportManagementVehicleDriverMappingComponent {
    constructor(vehicleDriverMappingService, loaderService, router, snackBar, activeRoute) {
        this.vehicleDriverMappingService = vehicleDriverMappingService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.selectedDrivers = [];
        this.drivers = [];
        this.vehicles = [];
        this.otherDrivers = [];
        this.primaryDrivers = [];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.vehicleId = +res.id);
        this.getDriverMasters();
        this.getVehicleMasters();
    }
    getDriverByVehicleId() {
        this.loaderService.toggleLoader(true);
        this.vehicleDriverMappingService.getDriverByVehicleId(this.vehicleId).then(res => {
            var response = res.json();
            var list = response.filter(x => x.isPrimary === false);
            this.selectedDrivers = list.map(x => x.driverId);
            var primary = response.find(x => x.isPrimary === true);
            if (primary) {
                this.primaryDriver = primary.driverId;
            }
            this.filterDriver();
            this.loaderService.toggleLoader(false);
        });
    }
    getDriverMasters() {
        this.loaderService.toggleLoader(true);
        this.vehicleDriverMappingService.getDriverMasters().then(res => {
            this.drivers = res.json();
            this.getDriverByVehicleId();
            this.loaderService.toggleLoader(false);
        });
    }
    getVehicleMasters() {
        this.loaderService.toggleLoader(true);
        this.vehicleDriverMappingService.getVehicleMasters().then(res => {
            this.vehicles = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addOrUpdateVehicleDriverMapping() {
        this.loaderService.toggleLoader(true);
        var list = [{ DriverId: this.primaryDriver, IsPrimary: true }];
        for (var i = 0; i < this.selectedDrivers.length; i++) {
            list.push({ DriverId: this.selectedDrivers[i], IsPrimary: false });
        }
        var data = { VehicleId: this.vehicleId, Drivers: list };
        this.vehicleDriverMappingService.addOrUpdateVehicleDriverMapping(data).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['transportmanagement', 'vehicledrivermapping', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
    filterDriver() {
        this.otherDrivers = JSON.parse(JSON.stringify(this.drivers));
        this.primaryDrivers = JSON.parse(JSON.stringify(this.drivers));
        if (this.primaryDriver) {
            var driverIndex = this.otherDrivers.findIndex(x => x.id === this.primaryDriver);
            this.otherDrivers.splice(driverIndex, 1);
        }
        if (this.selectedDrivers.length) {
            for (var i = 0; i < this.selectedDrivers.length; i++) {
                var index = this.primaryDrivers.findIndex(x => x.id === this.selectedDrivers[i]);
                this.primaryDrivers.splice(index, 1);
            }
        }
    }
};
EditAndDetailTransportManagementVehicleDriverMappingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-vehicledrivermapping-edit-detail.html'
    }),
    __metadata("design:paramtypes", [transport_management_vehicledrivermapping_service_1.VehicleDriverMappingService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailTransportManagementVehicleDriverMappingComponent);
exports.EditAndDetailTransportManagementVehicleDriverMappingComponent = EditAndDetailTransportManagementVehicleDriverMappingComponent;
//# sourceMappingURL=transport-management-vehicledrivermapping-edit-detail.component.js.map