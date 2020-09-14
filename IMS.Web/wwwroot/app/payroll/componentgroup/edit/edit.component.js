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
const permission_service_1 = require("../../../../shared/permission.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const componentgroup_model_1 = require("../componentgroup.model");
const componentgroup_service_1 = require("../componentgroup.service");
let EditComponent = class EditComponent {
    constructor(loaderService, permissionService, groupService, snackBar, activatedRoute, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.groupService = groupService;
        this.snackBar = snackBar;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.errorMessage = '';
        this.addGroup = new componentgroup_model_1.GroupModel();
        this.activatedRoute.params.subscribe(param => this.groupId = param.id);
    }
    ngOnInit() {
        this.getGroupDetail();
    }
    getGroupDetail() {
        this.loaderService.toggleLoader(true);
        this.groupService.getComponentGroupById(this.groupId).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['payroll', 'componentgroup']);
            }
            this.addGroup = response;
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            console.log(error.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.groupService.updateComponentGroup(this.addGroup).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['payroll', 'componentgroup']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
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
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        componentgroup_service_1.ComponentGroupService,
        snackbar_service_1.SnackbarService,
        router_1.ActivatedRoute,
        router_1.Router])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map