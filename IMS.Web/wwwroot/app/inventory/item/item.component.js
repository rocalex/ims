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
const item_model_1 = require("./item.model");
const item_service_1 = require("./item.service");
let ItemComponent = class ItemComponent {
    constructor(loaderService, permissionService, apiService, snackService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackService = snackService;
        this.addItem = new item_model_1.ItemModel();
        this.noteList = [];
        this.documentList = [];
        this.uomList = [];
        this.itemTypeList = [];
        this.isAddingNotes = false;
        this.isEnableAddingDocument = false;
        this.addNote = new item_model_1.NoteModel();
        this.addDocument = new item_model_1.DocumentModel();
    }
    ngOnInit() {
        this.getUOMList();
    }
    init() {
    }
    getUOMList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getUOMList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.uomList = response;
            this.getItemTypeList();
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getItemTypeList() {
        this.apiService.getItemTypeList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.itemTypeList = response;
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    enableAddingDocument() {
        this.isEnableAddingDocument = true;
    }
    enableAddingNotes() {
        this.isAddingNotes = true;
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
ItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './item.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        item_service_1.ItemService,
        snackbar_service_1.SnackbarService])
], ItemComponent);
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map