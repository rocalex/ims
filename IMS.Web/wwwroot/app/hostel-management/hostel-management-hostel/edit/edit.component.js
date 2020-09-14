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
let EditComponent = class EditComponent {
    constructor(activateRoute, loaderService, router, snackBar, service) {
        this.activateRoute = activateRoute;
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
        this.hostelId = 0;
        this.activateRoute.params.subscribe(param => this.hostelId = param.id);
    }
    ngOnInit() {
        this.getHostelInfo();
    }
    getHostelInfo() {
        this.loaderService.toggleLoader(true);
        this.service.getHostelById(this.hostelId).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'list']);
            }
            this.addHostel = response;
            this.service.getAdditional().then(res1 => {
                let response1 = res1.json();
                if (response1.hasError !== null && response1.hasError !== undefined && response1.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['hostel', 'list']);
                }
                this.memberList = response1.students;
                this.countryList = response1.country;
                this.stateList = response1.state;
                this.cityList = response1.city;
                this.loaderService.toggleLoader(false);
            });
        }).catch(error => {
            console.log(error.json());
            this.loaderService.toggleLoader(false);
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
        this.service.updateHostel(this.addHostel).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.router.navigate(['hostel', 'list']);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.snackBar.showSnackbar(err.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService,
        hostel_management_hostel_service_1.HostelManagementHostelService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map