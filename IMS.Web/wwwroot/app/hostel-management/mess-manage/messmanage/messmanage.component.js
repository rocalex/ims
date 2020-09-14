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
const permission_service_1 = require("../../../../shared/permission.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const messmanage_service_1 = require("./messmanage.service");
const messmanage_model_1 = require("./messmanage.model");
let MessmanageComponent = class MessmanageComponent {
    constructor(loaderService, permissionService, apiService, snackService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackService = snackService;
        this.hostelList = [];
        this.searchMess = new messmanage_model_1.SearchMessRequest();
        this.messManages = [];
        this.todayDate = new Date();
        this.isSearched = false;
    }
    ngOnInit() {
        this.getHostelList();
    }
    getHostelList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getHostelList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.hostelList = response;
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    search() {
        this.loaderService.toggleLoader(true);
        this.apiService.getMessManage(this.searchMess).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.messManages = response;
            this.isSearched = true;
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
    save() {
        this.loaderService.toggleLoader(true);
        var request = new messmanage_model_1.AddMessRequest();
        request.fromDate = this.searchMess.fromDate;
        request.toDate = this.searchMess.toDate;
        request.hostelId = this.searchMess.hostelId;
        request.mappings = this.messManages;
        console.log(request);
        this.apiService.addMessManages(request).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            this.snackService.showSnackbar(response.message);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                return;
            }
            this.messManages = [];
            this.isSearched = false;
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
MessmanageComponent = __decorate([
    core_1.Component({
        selector: 'app-messmanage',
        templateUrl: './messmanage.component.html',
        styleUrls: ['./messmanage.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        messmanage_service_1.MessManageService,
        snackbar_service_1.SnackbarService])
], MessmanageComponent);
exports.MessmanageComponent = MessmanageComponent;
//# sourceMappingURL=messmanage.component.js.map