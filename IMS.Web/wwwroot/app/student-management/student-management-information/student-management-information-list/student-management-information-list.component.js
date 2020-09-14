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
const common_1 = require("@angular/common");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const student_management_information_service_1 = require("../student-management-information.service");
const material_1 = require("@angular/material");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListStudentInformationManagementComponent = class ListStudentInformationManagementComponent {
    constructor(studentManagementService, location, router, activatedRoute, loaderService, permissionService, snackbarService, dialog) {
        this.studentManagementService = studentManagementService;
        this.location = location;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.snackbarService = snackbarService;
        this.dialog = dialog;
        this.students = [];
        this.initialData = {};
        this.selectedClass = {};
        this.section = {};
        this.filteredData = [];
        this.search = '';
        this.activatedRoute.params.subscribe(param => this.classId = param.id);
    }
    ngOnInit() {
        this.getInititalData();
        this.getAllStudentByInsituteId();
    }
    getAllStudentByInsituteId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getAllStudentByInsituteId(this.classId).then(res => {
            this.students = res.json();
            this.filterData();
            this.loaderService.toggleLoader(false);
        });
    }
    backPage() {
        this.location.back();
    }
    archiveStudent(studentId) {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.archiveStudent(studentId)
            .then(res => {
            this.snackbarService.showSnackbar(res.json().message);
            this.loaderService.toggleLoader(false);
            this.ngOnInit();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    markActiveAndInActiveStudent(studentId) {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.markActiveAndInActiveStudent(studentId).then(res => {
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    getInititalData() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getInititalData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    openFilter(filterStudent) {
        this.dialog.open(filterStudent);
    }
    closeModal() {
        this.selectedClass = {};
        this.section = {};
        this.filterData();
    }
    filterData() {
        this.filteredData = this.students;
        if (this.selectedClass.id) {
            this.filteredData = this.filteredData.filter(x => x.currentClassId === this.selectedClass.id);
        }
        if (this.section.id) {
            this.filteredData = this.filteredData.filter(x => x.sectionId === this.section.id);
        }
        this.dialog.closeAll();
    }
    searchStudent() {
        this.filterData();
        this.filteredData = this.filteredData.filter(x => x.firstName.toLowerCase().startsWith(this.search.toLowerCase()) ||
            x.rollNumber.toLowerCase().startsWith(this.search.toLowerCase()));
    }
    importExcel() {
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            this.loaderService.toggleLoader(true);
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            this.studentManagementService.importExcelData(formData).then(res => {
                var response = res.json();
                this.snackbarService.showSnackbar(response.message);
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
        window.open('/assets/demo-files/StudentImport.xlsx');
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Student, sidenav_model_1.UserGroupFeatureChildEnum.StudentInfo, type);
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], ListStudentInformationManagementComponent.prototype, "fileInput", void 0);
ListStudentInformationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-information-list.html'
    }),
    __metadata("design:paramtypes", [student_management_information_service_1.StudentManagementService,
        common_1.Location,
        router_1.Router, router_1.ActivatedRoute,
        loader_service_1.LoaderService, permission_service_1.PermissionService,
        snackbar_service_1.SnackbarService, material_1.MatDialog])
], ListStudentInformationManagementComponent);
exports.ListStudentInformationManagementComponent = ListStudentInformationManagementComponent;
//# sourceMappingURL=student-management-information-list.component.js.map