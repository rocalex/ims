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
const loader_service_1 = require("../../shared/loader-service");
const dashboard_service_1 = require("./dashboard.service");
let DriverDashboardComponent = class DriverDashboardComponent {
    constructor(loaderService, dashboardService) {
        this.loaderService = loaderService;
        this.dashboardService = dashboardService;
        this.vehicleDriverMappingsList = [];
        this.vehiclesList = [];
        this.primaryVehicle = {};
        this.driverInfo = {};
        this.vehicleAccidentMaintenanceDetailsList = [];
        this.zoom = 8;
        this.markers = {
            label: 'A',
            draggable: true
        };
    }
    ngOnInit() {
        this.getDriverDashboardDetails();
    }
    getDriverDashboardDetails() {
        this.loaderService.toggleLoader(true);
        this.dashboardService.getDriverDashboardDetails()
            .then(res => {
            let response = res.json();
            console.log(res.json());
            this.vehicleDriverMappingsList = response.vehiclesList;
            this.vehiclesList = this.vehicleDriverMappingsList.map(x => x.vehicle);
            this.primaryVehicle = this.vehicleDriverMappingsList.filter(x => x.isPrimary).map(x => x.vehicle)[0];
            this.driverInfo = this.vehicleDriverMappingsList[0].driver;
            this.vehicleAccidentMaintenanceDetailsList = response.vehicleAccidentMaintenanceDetailsList;
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    mapClicked($event) {
        this.markers.lat = $event.coords.lat;
        this.markers.lng = $event.coords.lng;
    }
};
DriverDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        dashboard_service_1.DashboardService])
], DriverDashboardComponent);
exports.DriverDashboardComponent = DriverDashboardComponent;
//# sourceMappingURL=dashboard.component.js.map