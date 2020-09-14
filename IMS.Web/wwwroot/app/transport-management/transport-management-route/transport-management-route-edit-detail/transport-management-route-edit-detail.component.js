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
const transport_management_route_service_1 = require("../transport-management-route.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const transport_management_route_model_1 = require("../transport-management-route.model");
const material_1 = require("@angular/material");
let EditAndDetailTransportManagementRouteComponent = class EditAndDetailTransportManagementRouteComponent {
    constructor(routeService, loaderService, dialog, router, snackBar, activeRoute) {
        this.routeService = routeService;
        this.loaderService = loaderService;
        this.dialog = dialog;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.addRoute = new transport_management_route_model_1.UpdateRouteManagementAc();
        this.error = new transport_management_route_model_1.RouteManagementResponse();
        this.initialData = {};
        this.tempData = new transport_management_route_model_1.RouteStageMappingAc();
        this.fromList = [];
        this.toList = [];
        this.id = 1;
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addRoute.Id = res.id);
        this.getRoute();
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.routeService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getRoute() {
        this.loaderService.toggleLoader(true);
        this.routeService.getRoute(this.addRoute.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'route', 'list']);
            }
            else {
                this.addRoute.StartDate = response.startDate;
                this.addRoute.Code = response.code;
                this.addRoute.Name = response.name;
                for (var i = 0; i < response.routeStageMappings.length; i++) {
                    var stageRoute = response.routeStageMappings[i];
                    var temp = new transport_management_route_model_1.RouteStageMappingAc();
                    temp.DemoId = this.id;
                    this.id++;
                    temp.Distance = stageRoute.distance;
                    temp.FromPlaceId = stageRoute.fromPlaceId;
                    temp.ToPlaceId = stageRoute.toPlaceId;
                    this.addRoute.RouteStageMappings.push(temp);
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateRoute() {
        this.loaderService.toggleLoader(true);
        this.routeService.updateRoute(this.addRoute).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'route', 'list']);
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
        var id = transport_management_route_model_1.RouteManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_route_model_1.RouteManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_route_model_1.RouteManagementResponse();
        }
    }
    addList(addSubjectDialogRef) {
        this.tempData.DemoId = this.id;
        this.id++;
        this.openModal(addSubjectDialogRef);
    }
    openModal(addSubjectDialogRef) {
        this.dialog.open(addSubjectDialogRef, { width: '1000px' });
        this.assignStage();
    }
    closeModal() {
        this.tempData = new transport_management_route_model_1.RouteStageMappingAc();
        this.dialog.closeAll();
    }
    saveModal() {
        var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === this.tempData.DemoId);
        if (index === -1) {
            this.addRoute.RouteStageMappings.push(this.tempData);
        }
        else {
            this.addRoute.RouteStageMappings[index] = this.tempData;
        }
        this.tempData = new transport_management_route_model_1.RouteStageMappingAc();
        this.closeModal();
    }
    editModal(id, addSubjectDialogRef) {
        var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === id);
        this.tempData = this.addRoute.RouteStageMappings[index];
        this.openModal(addSubjectDialogRef);
    }
    deleteFromList(id) {
        var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === id);
        this.addRoute.RouteStageMappings.splice(index, 1);
    }
    getStageName(id) {
        if (this.initialData.stages) {
            var stage = this.initialData.stages.find(x => x.id === id);
            return stage.name;
        }
    }
    assignStage() {
        this.fromList = JSON.parse(JSON.stringify(this.initialData.stages));
        this.toList = JSON.parse(JSON.stringify(this.initialData.stages));
        if (this.tempData.FromPlaceId) {
            var from = this.toList.findIndex(x => x.id === this.tempData.FromPlaceId);
            this.toList.splice(from, 1);
        }
        if (this.tempData.ToPlaceId) {
            var to = this.fromList.findIndex(x => x.id === this.tempData.ToPlaceId);
            this.fromList.splice(to, 1);
        }
    }
    getTotalKm() {
        var kms = this.addRoute.RouteStageMappings.map(x => x.Distance);
        var total = 0;
        for (var i = 0; i < kms.length; i++) {
            total += kms[i];
        }
        return total;
    }
    getFromPlace() {
        if (this.addRoute.RouteStageMappings.length) {
            return this.getStageName(this.addRoute.RouteStageMappings[0].FromPlaceId);
        }
        else {
            return '';
        }
    }
    getToPlace() {
        if (this.addRoute.RouteStageMappings.length) {
            return this.getStageName(this.addRoute.RouteStageMappings[(this.addRoute.RouteStageMappings.length - 1)].ToPlaceId);
        }
        else {
            return '';
        }
    }
};
EditAndDetailTransportManagementRouteComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-route-edit-detail.html'
    }),
    __metadata("design:paramtypes", [transport_management_route_service_1.RouteService, loader_service_1.LoaderService, material_1.MatDialog,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailTransportManagementRouteComponent);
exports.EditAndDetailTransportManagementRouteComponent = EditAndDetailTransportManagementRouteComponent;
//# sourceMappingURL=transport-management-route-edit-detail.component.js.map