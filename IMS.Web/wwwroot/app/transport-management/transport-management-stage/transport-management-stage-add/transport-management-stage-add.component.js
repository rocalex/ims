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
const transport_management_stage_service_1 = require("../transport-management-stage.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const transport_management_stage_model_1 = require("../transport-management-stage.model");
let AddTransportManagementStageComponent = class AddTransportManagementStageComponent {
    constructor(stageService, loaderService, router, snackBar) {
        this.stageService = stageService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.addStage = new transport_management_stage_model_1.AddStageManagementAc();
        this.error = new transport_management_stage_model_1.StageManagementResponse();
        this.initialData = {};
        this.zoom = 8;
        this.markers = {
            label: 'A',
            draggable: true
        };
        if (navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lng = +pos.coords.longitude;
                this.lat = +pos.coords.latitude;
            });
        }
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.stageService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addStageData() {
        this.loaderService.toggleLoader(true);
        this.addStage.Latitude = this.markers.lat;
        this.addStage.Longitude = this.markers.lng;
        this.stageService.addStage(this.addStage).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'stage', 'list']);
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
        var id = transport_management_stage_model_1.StageManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_stage_model_1.StageManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_stage_model_1.StageManagementResponse();
        }
    }
    mapClicked($event) {
        this.markers.lat = $event.coords.lat;
        this.markers.lng = $event.coords.lng;
    }
    handleAddressChange(address) {
        this.lng = address.geometry.location.lng();
        this.lat = address.geometry.location.lat();
        this.markers.lat = address.geometry.location.lat();
        this.markers.lng = address.geometry.location.lng();
    }
};
AddTransportManagementStageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-stage-add.html'
    }),
    __metadata("design:paramtypes", [transport_management_stage_service_1.StageService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddTransportManagementStageComponent);
exports.AddTransportManagementStageComponent = AddTransportManagementStageComponent;
//# sourceMappingURL=transport-management-stage-add.component.js.map