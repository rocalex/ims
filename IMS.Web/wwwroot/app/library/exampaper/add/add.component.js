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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const exampaper_model_1 = require("../exampaper.model");
const exampaper_service_1 = require("../exampaper.service");
let AddComponent = class AddComponent {
    constructor(loaderService, snackbar, router, permissionService, apiService) {
        this.loaderService = loaderService;
        this.snackbar = snackbar;
        this.router = router;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.classList = [];
        this.mappingList = [];
        this.academicYearList = [];
        this.addExampaper = new exampaper_model_1.ExamPaper();
    }
    ngOnInit() {
        this.getClassList();
    }
    getClassList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getClassList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.classList = response;
                this.getAcademicList();
            }
            else {
                this.snackbar.showSnackbar(response.message);
                this.router.navigate(['library', 'exampapers']);
            }
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
    getAcademicList() {
        this.apiService.getAcademicList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.academicYearList = response;
            }
            else {
                this.snackbar.showSnackbar(response.message);
                this.router.navigate(['library', 'exampapers']);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
    onChangeClass(classId) {
        this.apiService.getMappingByClassId(classId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.mappingList = response;
            }
            else {
                this.snackbar.showSnackbar(response.message);
                this.router.navigate(['library', 'exampapers']);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.addExamPaper(this.addExampaper).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.router.navigate(['library', 'exampapers']);
            }
            else {
                this.snackbar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
AddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        permission_service_1.PermissionService,
        exampaper_service_1.ExamPaperService])
], AddComponent);
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map