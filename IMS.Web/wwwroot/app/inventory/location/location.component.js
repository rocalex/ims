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
const loader_service_1 = require("../../../shared/loader-service");
const permission_service_1 = require("../../../shared/permission.service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../shared/sidenav/sidenav.model");
const location_model_1 = require("./location.model");
const location_service_1 = require("./location.service");
let LocationComponent = class LocationComponent {
    constructor(loaderService, permissionService, apiService, snackService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackService = snackService;
        this.addLocation = new location_model_1.LocationModel();
        this.billingAddress = new location_model_1.AddressModel();
        this.shippingAddress = new location_model_1.AddressModel();
        this.countryList = [];
        this.billingStateList = [];
        this.billingCityList = [];
        this.shippingStateList = [];
        this.shippingCityList = [];
    }
    ngOnInit() {
        this.getCountryList();
    }
    init() {
        this.addLocation = new location_model_1.LocationModel();
        this.billingAddress = new location_model_1.AddressModel();
        this.shippingAddress = new location_model_1.AddressModel();
        this.billingStateList = [];
        this.billingCityList = [];
        this.shippingStateList = [];
        this.shippingCityList = [];
    }
    getCountryList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getCountryList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.countryList = response;
            this.loaderService.toggleLoader(false);
        });
    }
    billingCountryChange(id) {
        this.apiService.getStateList(id).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.billingStateList = response;
        });
    }
    billingStateChange(id) {
        this.apiService.getCityList(id).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.billingCityList = response;
        });
    }
    shippingCountryChange(id) {
        this.apiService.getStateList(id).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.shippingStateList = response;
        });
    }
    shippingStateChange(id) {
        this.apiService.getCityList(id).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.shippingCityList = response;
        });
    }
    save() {
        this.saveBillingAddress();
    }
    saveBillingAddress() {
        this.loaderService.toggleLoader(true);
        if (this.billingAddress.cityId != null) {
            this.apiService.saveAddress(this.billingAddress).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    this.loaderService.toggleLoader(false);
                    return;
                }
                this.addLocation.billingAddressId = response.id;
                this.saveShippingAddress();
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.saveShippingAddress();
        }
    }
    saveShippingAddress() {
        if (this.shippingAddress.cityId != null) {
            this.apiService.saveAddress(this.shippingAddress).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    this.loaderService.toggleLoader(false);
                    return;
                }
                this.addLocation.shippingAddressId = response.id;
                this.saveLocation();
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.saveLocation();
        }
    }
    saveLocation() {
        this.apiService.saveLocation(this.addLocation).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.init();
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
LocationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './location.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        location_service_1.LocationService,
        snackbar_service_1.SnackbarService])
], LocationComponent);
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map