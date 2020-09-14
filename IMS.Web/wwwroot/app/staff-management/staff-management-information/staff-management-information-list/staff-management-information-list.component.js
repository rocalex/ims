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
const staff_management_information_service_1 = require("../staff-management-information.service");
const loader_service_1 = require("../../../../shared/loader-service");
const staff_management_information_model_1 = require("../staff-management-information.model");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const material_1 = require("@angular/material");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListStaffManagementInformationComponent = class ListStaffManagementInformationComponent {
    constructor(staffManagementService, loaderService, snackBar, dialog, permissionService) {
        this.staffManagementService = staffManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.permissionService = permissionService;
        this.staffs = [];
        this.maritalStatusEnum = staff_management_information_model_1.MaritalStatusEnum;
        this.filteredData = [];
        this.initialData = {};
    }
    ngOnInit() {
        this.getInitialDataForAddOrEditStaff();
        this.getAllStaffByInsituteId();
    }
    getAllStaffByInsituteId() {
        this.loaderService.toggleLoader(true);
        this.staffManagementService.getAllStaffByInsituteId().then(res => {
            this.staffs = res.json();
            this.filterData();
            this.loaderService.toggleLoader(false);
        });
    }
    archiveStaff(staffId) {
        this.loaderService.toggleLoader(true);
        this.staffManagementService.archiveStaff(staffId).then(res => {
            this.snackBar.showSnackbar('Staff archived successfully');
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    importExcel() {
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            this.loaderService.toggleLoader(true);
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            this.staffManagementService.importExcelData(formData).then(res => {
                var response = res.json();
                this.snackBar.showSnackbar(response.message);
                this.ngOnInit();
                this.loaderService.toggleLoader(false);
            });
            this.closeImportDialog();
        }
    }
    openImportDialog(staffImport) {
        this.dialog.open(staffImport);
    }
    closeImportDialog() {
        this.dialog.closeAll();
    }
    downloadFile() {
        window.open('/assets/demo-files/StaffImport.xlsx');
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.StaffInfo, type);
    }
    filterData() {
        this.filteredData = this.staffs;
        if (this.genderId) {
            this.filteredData = this.filteredData.filter(x => x.genderId === this.genderId);
        }
        if (this.teachingTypeId) {
            this.filteredData = this.filteredData.filter(x => x.teachingStaffId === this.teachingTypeId);
        }
        this.dialog.closeAll();
    }
    searchStaff() {
        this.filterData();
        this.filteredData = this.filteredData.filter(x => x.firstName.toLowerCase().startsWith(this.search.toLowerCase()) ||
            x.employeeId.toLowerCase().startsWith(this.search.toLowerCase()));
    }
    openFilter(filter) {
        this.dialog.open(filter);
    }
    closeModal() {
        this.genderId = undefined;
        this.teachingTypeId = undefined;
        this.filterData();
    }
    getInitialDataForAddOrEditStaff() {
        this.loaderService.toggleLoader(true);
        this.staffManagementService.getInitialDataForAddOrEditStaff().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], ListStaffManagementInformationComponent.prototype, "fileInput", void 0);
ListStaffManagementInformationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-information-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_information_service_1.StaffManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService, material_1.MatDialog, permission_service_1.PermissionService])
], ListStaffManagementInformationComponent);
exports.ListStaffManagementInformationComponent = ListStaffManagementInformationComponent;
//# sourceMappingURL=staff-management-information-list.component.js.map