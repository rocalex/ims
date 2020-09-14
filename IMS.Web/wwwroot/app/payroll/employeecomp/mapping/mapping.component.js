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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const permission_service_1 = require("../../../../shared/permission.service");
const dialog_1 = require("@angular/material/dialog");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const mapping_model_1 = require("./mapping.model");
const mapping_service_1 = require("./mapping.service");
let MappingComponent = class MappingComponent {
    constructor(groupService, loaderService, snackBar, router, activatedRoute, permissionService, dialog) {
        this.groupService = groupService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.permissionService = permissionService;
        this.dialog = dialog;
        this.groupList = [];
        this.addMapping = new mapping_model_1.MappingModel();
        this.componentList = [];
        this.typeList = [
            { id: 1, name: "Standard" },
            { id: 2, name: "Formula" }
        ];
        this.activatedRoute.params.subscribe(param => {
            this.staffId = param.id;
            this.addMapping.staffId = this.staffId;
        });
    }
    ngOnInit() {
        this.getGroupList();
    }
    getGroupList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getMappingForLoggedInUser(this.staffId)
            .then(res => {
            this.groupList = res.json();
            this.getComponentList();
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    getComponentList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getComponentList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.componentList = response;
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    openAdd() {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '800px',
            height: '500px',
            data: { addMapping: this.addMapping, componentList: this.componentList }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getGroupList();
        });
    }
    openEdit(mapping) {
        const dialogRef = this.dialog.open(EditDialog, {
            width: '800px',
            height: '500px',
            data: { addMapping: mapping, componentList: this.componentList }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getGroupList();
        });
    }
    delete(mapping) {
        this.loaderService.toggleLoader(true);
        this.groupService.deleteMapping(mapping.id).then(res => {
            let response = res.json();
            this.snackBar.showSnackbar(response.message);
            this.getGroupList();
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
MappingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './mapping.component.html'
    }),
    __metadata("design:paramtypes", [mapping_service_1.MappingService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        router_1.ActivatedRoute,
        permission_service_1.PermissionService,
        dialog_1.MatDialog])
], MappingComponent);
exports.MappingComponent = MappingComponent;
let DialogOverviewExampleDialog = class DialogOverviewExampleDialog {
    constructor(apiService, snackBar, loaderService, dialogRef, data) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.componentList = [];
        this.operatorList = ['+', '-'];
        this.typeList = [
            { id: 1, name: "Standard" },
            { id: 2, name: "Formula" }
        ];
        this.isFormula = false;
        this.addMapping = new mapping_model_1.MappingModel();
        this.componentList = data.componentList;
        this.addMapping = data.addMapping;
    }
    changeComponentType(value) {
        if (value == 2) {
            this.isFormula = true;
        }
        else if (value == 1) {
            this.isFormula = false;
        }
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.addMapping(this.addMapping).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.snackBar.showSnackbar(response.message);
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    cancel() {
        this.dialogRef.close();
    }
};
DialogOverviewExampleDialog = __decorate([
    core_1.Component({
        selector: 'add-mapping-dialog',
        templateUrl: 'add-mapping.dialog.html',
    }),
    __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [mapping_service_1.MappingService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        dialog_1.MatDialogRef, Object])
], DialogOverviewExampleDialog);
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
let EditDialog = class EditDialog {
    constructor(apiService, snackBar, loaderService, dialogRef, data) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.componentList = [];
        this.operatorList = ['+', '-'];
        this.typeList = [
            { id: 1, name: "Standard" },
            { id: 2, name: "Formula" }
        ];
        this.isFormula = false;
        this.addMapping = new mapping_model_1.MappingModel();
        this.componentList = data.componentList;
        this.addMapping = data.addMapping;
        this.changeComponentType(this.addMapping.componentTypeId);
    }
    changeComponentType(value) {
        if (value == 2) {
            this.isFormula = true;
        }
        else if (value == 1) {
            this.isFormula = false;
        }
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.updateMapping(this.addMapping).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.snackBar.showSnackbar(response.message);
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    cancel() {
        this.dialogRef.close();
    }
};
EditDialog = __decorate([
    core_1.Component({
        selector: 'edit-dialog',
        templateUrl: 'edit-mapping.dialog.html',
    }),
    __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [mapping_service_1.MappingService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        dialog_1.MatDialogRef, Object])
], EditDialog);
exports.EditDialog = EditDialog;
//# sourceMappingURL=mapping.component.js.map