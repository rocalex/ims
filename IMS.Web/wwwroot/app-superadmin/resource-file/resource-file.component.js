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
const resource_file_service_1 = require("./resource-file.service");
const ang_jsoneditor_1 = require("ang-jsoneditor");
const schema_value_1 = require("./schema.value");
const loader_service_1 = require("../../shared/loader-service");
const snackbar_service_1 = require("../../shared/snackbar-service");
let ResourceFileManagementComponent = class ResourceFileManagementComponent {
    constructor(resourceFileManagementService, loaderService, snackBar) {
        this.resourceFileManagementService = resourceFileManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.options = new ang_jsoneditor_1.JsonEditorOptions();
        this.fileTypes = ['English', 'Arabic'];
        this.options.mode = 'code';
        this.options.modes = ['code', 'text', 'tree', 'view'];
        this.options.schema = schema_value_1.schema;
        this.options.statusBar = false;
    }
    ngOnInit() {
        this.selectedType = this.fileTypes[0];
        this.readResourceFile();
    }
    readResourceFile() {
        this.loaderService.toggleLoader(true);
        this.resourceFileManagementService.readResourceFile(this.selectedType).then(res => {
            this.data = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    updateResourceFile() {
        this.loaderService.toggleLoader(true);
        this.resourceFileManagementService.updateResourceFile(this.data, this.selectedType).then(res => {
            this.snackBar.showSnackbar('File updated, file do refresh.');
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.ViewChild(ang_jsoneditor_1.JsonEditorComponent),
    __metadata("design:type", ang_jsoneditor_1.JsonEditorComponent)
], ResourceFileManagementComponent.prototype, "editor", void 0);
ResourceFileManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'resource-file.html'
    }),
    __metadata("design:paramtypes", [resource_file_service_1.ResourceFileManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], ResourceFileManagementComponent);
exports.ResourceFileManagementComponent = ResourceFileManagementComponent;
//# sourceMappingURL=resource-file.component.js.map