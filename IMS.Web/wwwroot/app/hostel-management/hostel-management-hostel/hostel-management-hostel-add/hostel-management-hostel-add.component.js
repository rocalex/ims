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
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const hostel_management_hostel_model_1 = require("../hostel-management-hostel.model");
const hostel_management_hostel_service_1 = require("../hostel-management-hostel.service");
let HostelManagementAddHostelComponent = class HostelManagementAddHostelComponent {
    constructor(loaderService, router, snackBar, service) {
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.service = service;
        this.currentDate = new Date();
        this.zoom = 8;
        this.markers = {
            label: 'A',
            draggable: true
        };
        this.countryList = [];
        this.stateList = [];
        this.cityList = [];
        this.memberList = [];
        this.hostelTypes = [
            {
                label: 'female',
                value: 0
            },
            {
                label: 'male',
                value: 1
            }
        ];
        this.addHostel = new hostel_management_hostel_model_1.HostelModel();
    }
    ngOnInit() {
        this.getAdditional();
    }
    getAdditional() {
        this.service.getAdditional().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.countryList = response.country;
                this.stateList = response.state;
                this.cityList = response.city;
                this.memberList = response.students;
            }
            else {
                this.snackBar.showSnackbar("There is problem on fetching initial data!");
            }
        }).catch(error => {
            this.snackBar.showSnackbar(error.message);
        });
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
    add() {
        this.loaderService.toggleLoader(true);
        this.service.addNewHostel(this.addHostel).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                this.router.navigate(['hostel', 'list']);
            }
            else {
                this.snackBar.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
            }
        }).catch(err => {
            this.snackBar.showSnackbar(err.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
HostelManagementAddHostelComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'hostel-management-hostel-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService,
        hostel_management_hostel_service_1.HostelManagementHostelService])
], HostelManagementAddHostelComponent);
exports.HostelManagementAddHostelComponent = HostelManagementAddHostelComponent;
//# sourceMappingURL=hostel-management-hostel-add.component.js.map