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
const priceList_model_1 = require("./priceList.model");
const priceList_service_1 = require("./priceList.service");
let PriceListComponent = class PriceListComponent {
    constructor(loaderService, permissionService, apiService, snackService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackService = snackService;
        this.addPriceList = new priceList_model_1.PriceList();
        this.typeList = [
            { id: 0, name: "Sale" },
            { id: 1, name: "Purchase" }
        ];
        this.currencyList = [];
        this.rateTypeList = [
            { id: 0, name: "All Items" },
            { id: 1, name: "Item Wise" }
        ];
        this.customRateList = [
            { id: 0, name: "Up" },
            { id: 1, name: "Down" }
        ];
        this.calculationTypeList = [
            { id: 0, name: "Value" },
            { id: 1, name: "Percentage" }
        ];
    }
    ngOnInit() {
        this.getCurrencyList();
    }
    init() {
    }
    getCurrencyList() {
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
PriceListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './priceList.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        priceList_service_1.PriceListService,
        snackbar_service_1.SnackbarService])
], PriceListComponent);
exports.PriceListComponent = PriceListComponent;
//# sourceMappingURL=priceList.component.js.map