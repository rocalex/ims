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
const institute_management_service_1 = require("../institute-management.service");
const institute_management_model_1 = require("../institute-management.model");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const loader_service_1 = require("../../../shared/loader-service");
let InstituteManagementEditComponent = class InstituteManagementEditComponent {
    constructor(instituteManagementService, snackBar, router, loaderService, activeRoute) {
        this.instituteManagementService = instituteManagementService;
        this.snackBar = snackBar;
        this.router = router;
        this.loaderService = loaderService;
        this.activeRoute = activeRoute;
        this.institute = new institute_management_model_1.UpdateInstitute();
        this.error = new institute_management_model_1.InstituteResponse();
        this.zoom = 8;
        this.markers = {
            label: 'A',
            draggable: true
        };
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.institute.Id = +res.id);
        this.getInstituteDetail();
    }
    getInstituteDetail() {
        this.loaderService.toggleLoader(true);
        this.instituteManagementService.getInstituteDetail(this.institute.Id).then(res => {
            var response = res.json();
            if (response) {
                this.institute.Address = response.address;
                this.institute.Code = response.code;
                this.institute.InstituteName = response.name;
                this.institute.Latitude = response.latitude;
                this.institute.Longitude = response.longitude;
                this.institute.Location = response.location;
                this.markers.lat = this.institute.Latitude;
                this.markers.lng = this.institute.Longitude;
                this.lat = +this.institute.Latitude;
                this.lng = +this.institute.Longitude;
            }
            else {
                this.router.navigate(['institute', 'list']);
                this.snackBar.showSnackbar('Institute not found');
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstitute() {
        this.loaderService.toggleLoader(true);
        this.institute.Latitude = this.markers.lat;
        this.institute.Longitude = this.markers.lng;
        this.instituteManagementService.updateInstitute(this.institute).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['institute', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
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
};
InstituteManagementEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-edit.html'
    }),
    __metadata("design:paramtypes", [institute_management_service_1.InstituteManagementService, snackbar_service_1.SnackbarService,
        router_1.Router, loader_service_1.LoaderService, router_1.ActivatedRoute])
], InstituteManagementEditComponent);
exports.InstituteManagementEditComponent = InstituteManagementEditComponent;
//# sourceMappingURL=institute-management-edit.component.js.map