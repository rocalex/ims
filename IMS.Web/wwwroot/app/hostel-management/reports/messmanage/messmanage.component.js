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
const expenditure_srevice_1 = require("../../mess-manage/expenditure/expenditure.srevice");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const permission_service_1 = require("../../../../shared/permission.service");
const report_service_1 = require("../report.service");
let MessManageComponent = class MessManageComponent {
    constructor(apiService, reportService, loaderService, snackBar, permissionService) {
        this.apiService = apiService;
        this.reportService = reportService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.permissionService = permissionService;
        this.hostelList = [];
        this.messManageList = [];
        this.isSearched = false;
        this.results = [];
    }
    ngOnInit() {
        this.getHostelList();
    }
    getHostelList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getHostelList().then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.hostelList = response;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    getMessManageList(hostelId) {
        this.loaderService.toggleLoader(true);
        this.apiService.getMessManageList(hostelId).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.messManageList = response;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
    search(id) {
        this.loaderService.toggleLoader(true);
        this.reportService.getMessManageSummar(id).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.results = response;
            this.isSearched = true;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
};
MessManageComponent = __decorate([
    core_1.Component({
        selector: 'app-expenditure',
        templateUrl: './messmanage.component.html'
    }),
    __metadata("design:paramtypes", [expenditure_srevice_1.ExpenditureService,
        report_service_1.ReportService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        permission_service_1.PermissionService])
], MessManageComponent);
exports.MessManageComponent = MessManageComponent;
//# sourceMappingURL=messmanage.component.js.map