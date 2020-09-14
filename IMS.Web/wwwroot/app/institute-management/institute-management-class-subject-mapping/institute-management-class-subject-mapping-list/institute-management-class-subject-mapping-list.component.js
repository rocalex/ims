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
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const institute_management_class_subject_mapping_service_1 = require("../institute-management-class-subject-mapping.service");
const institute_management_class_service_1 = require("../../institute-management-class/institute-management-class.service");
let ListClassSubjectMappingManagementComponent = class ListClassSubjectMappingManagementComponent {
    constructor(classSubjectMappingManagementService, classManagementService, loaderService, snackBar) {
        this.classSubjectMappingManagementService = classSubjectMappingManagementService;
        this.classManagementService = classManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.classes = [];
        this.classSubjectMappings = [];
        this.faculties = [];
        this.updatedClassSubjectsMappingList = [];
        this.errorMessage = '';
    }
    ngOnInit() {
        this.selectedClassId = 0;
        this.faculties = [];
        this.classSubjectMappings = [];
        this.classes = [];
        this.errorMessage = undefined;
        this.getClasses();
    }
    // Method for fetching the classes
    getClasses() {
        this.loaderService.toggleLoader(true);
        this.classManagementService.getInstituteInstituteClasssList()
            .then(res => {
            this.classes = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    // Method for fetching the class-subject mappings by class id
    getClassSubjectMappingDetails() {
        this.updatedClassSubjectsMappingList = [];
        this.errorMessage = '';
        this.loaderService.toggleLoader(true);
        this.classSubjectMappingManagementService.getClassSubjectMappingsByClassId(this.selectedClassId)
            .then(res => {
            let response = res.json();
            this.faculties = response.faculties;
            this.classSubjectMappings = response.classSubjectMappings;
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
            console.log(err.json());
        });
    }
    // Method for mapping class and subject
    mapClassSubject(classSubjectMapping) {
        classSubjectMapping.isUpdated = (classSubjectMapping.isUpdated === null || classSubjectMapping.isUpdated === undefined) ? true : !classSubjectMapping.isUpdated;
        if (!classSubjectMapping.isMapped) {
            classSubjectMapping.facultyId = 0;
            classSubjectMapping.alternateFacultyId = 0;
        }
        this.updatedClassSubjectsMappingList.push(classSubjectMapping);
        this.updatedClassSubjectsMappingList = this.updatedClassSubjectsMappingList.filter(x => x.isUpdated);
    }
    // Method for updating mappings
    updateAssignedStaff(classSubjectMapping) {
        classSubjectMapping.isUpdated = true;
        let existingMapping = this.updatedClassSubjectsMappingList.filter(x => x.id === classSubjectMapping.id && x.subjectId === classSubjectMapping.subjectId)[0];
        if (existingMapping === null || existingMapping === undefined) {
            this.updatedClassSubjectsMappingList.push(classSubjectMapping);
            this.updatedClassSubjectsMappingList = this.updatedClassSubjectsMappingList.filter(x => x.isUpdated);
        }
    }
    // Method for updating the class subject mappings
    bulkUpdateClassSubjectMappings() {
        let invalidMapping = this.updatedClassSubjectsMappingList.filter(x => x.isMapped
            && (x.facultyId === null || x.facultyId === undefined || x.facultyId === 0
                || x.alternateFacultyId === null || x.alternateFacultyId === undefined || x.alternateFacultyId === 0));
        if (invalidMapping.length === 0 && this.updatedClassSubjectsMappingList.length > 0) {
            this.loaderService.toggleLoader(true);
            this.classSubjectMappingManagementService.bulkUpdateClassSubjectMappings(this.updatedClassSubjectsMappingList)
                .then(res => {
                let response = res.json();
                this.loaderService.toggleLoader(false);
                this.snackBar.showSnackbar(response.message);
                this.getClassSubjectMappingDetails();
            })
                .catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        else if (invalidMapping.length !== 0) {
            this.errorMessage = 'Please select faculty and alternate faculty for the selected subject(s)';
        }
    }
    cancelEditing() {
        this.ngOnInit();
    }
};
ListClassSubjectMappingManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-class-subject-mapping-list.html'
    }),
    __metadata("design:paramtypes", [institute_management_class_subject_mapping_service_1.ClassSubjectMappingManagementService,
        institute_management_class_service_1.ClassManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], ListClassSubjectMappingManagementComponent);
exports.ListClassSubjectMappingManagementComponent = ListClassSubjectMappingManagementComponent;
//# sourceMappingURL=institute-management-class-subject-mapping-list.component.js.map