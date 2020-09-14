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
const staff_management_information_model_1 = require("../staff-management-information.model");
const staff_management_information_service_1 = require("../staff-management-information.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let EditAndDetailStaffManagementInformationComponent = class EditAndDetailStaffManagementInformationComponent {
    constructor(staffManagementService, loaderService, router, snackBar) {
        this.staffManagementService = staffManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.addStaff = new staff_management_information_model_1.EditStaffManagementAc();
        this.error = new staff_management_information_model_1.StaffManagementResponse();
        this.initialData = {};
        this.selectedTab = 0;
        this.experienceList = [];
        this.experienceId = 0;
        this.errorMessageForExperience = '';
        this.tempExperience = new staff_management_information_model_1.AddStaffExperienceMappingAc();
        this.todayDate = new Date();
        this.gallerys = [];
        this.imageId = 1;
        this.imageFiles = [];
        this.documents = [];
        this.fileTypes = ['Image', 'File'];
        this.currentDate = new Date();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.addStaff.Id = +(path[3]);
        this.getStaffDetail();
    }
    getStaffDetail() {
        this.loaderService.toggleLoader(true);
        this.staffManagementService.getStaffDetail(this.addStaff.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['staff', 'master', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.getInitialDataForAddOrEditStaff();
                this.addStaff.FirstName = response.firstName;
                this.addStaff.MiddleName = response.middleName;
                this.addStaff.LastName = response.lastName;
                this.addStaff.DateOfBirth = response.dateOfBirth;
                this.addStaff.GenderId = response.genderId;
                this.addStaff.MaritalStatusId = response.maritalStatusId;
                this.addStaff.Qualification = response.qualification;
                this.addStaff.DateOfJoining = response.dateOfJoining;
                this.addStaff.IsTeachingStaff = response.isTeachingStaff;
                this.addStaff.TeachingStaffId = response.teachingStaffId;
                this.addStaff.EmployeeId = response.employeeId;
                this.addStaff.DesignationId = response.designationId;
                this.addStaff.NationalityId = response.nationalityId;
                this.addStaff.SocialSecurityNumber = response.socialSecurityNumber;
                this.addStaff.MotherTongueId = response.motherTongueId;
                this.addStaff.ReligionId = response.religionId;
                this.addStaff.CasteId = response.casteId;
                this.addStaff.BloodGroupId = response.bloodGroupId;
                this.addStaff.IdentificationMarks = response.identificationMarks;
                this.addStaff.PassportNumber = response.passportNumber;
                this.addStaff.PassportIssuedCountryId = response.passportIssuedCountryId;
                this.addStaff.PassportIssuedDate = response.passportIssuedDate;
                this.addStaff.PassportExpireDate = response.passportExpireDate;
                this.addStaff.PermanentAddress = response.permanentAddress;
                this.addStaff.PermanentCityId = response.permanentCityId;
                this.addStaff.PermanentZipcode = response.permanentZipcode;
                this.addStaff.MobileNumber = response.mobileNumber;
                this.addStaff.AlternatePhoneNumber = response.alternatePhoneNumber;
                this.addStaff.IsPresentAddressIsSameAsPermanent = response.isPresentAddressIsSameAsPermanent;
                this.addStaff.PresentAddress = response.presentAddress;
                this.addStaff.PresentCityId = response.presentCityId;
                this.addStaff.PresentZipcode = response.presentZipcode;
                this.addStaff.Email = response.user.email;
                this.imgURL = response.personalImage;
                this.addStaff.DepartmentsIdList = new Array();
                for (let i = 0; i < response.staffDepartments.length; i++) {
                    this.addStaff.DepartmentsIdList.push(response.staffDepartments[i].departmentId);
                }
                for (var i = 0; i < response.staffExperiences.length; i++) {
                    var experience = new staff_management_information_model_1.AddStaffExperienceMappingAc();
                    experience.InstituteName = response.staffExperiences[i].instituteName;
                    experience.StartDate = response.staffExperiences[i].startDate;
                    experience.EndDate = response.staffExperiences[i].endDate;
                    experience.IsEdit = false;
                    experience.Id = this.experienceId;
                    this.experienceId++;
                    this.experienceList.push(experience);
                }
                for (var i = 0; i < response.staffGalleries.length; i++) {
                    this.gallerys.push({ id: this.imageId, image: response.staffGalleries[i].imageUrl, previousId: response.staffGalleries[i].id });
                    this.imageId++;
                }
                for (var i = 0; i < response.staffDocumentMappings.length; i++) {
                    var staffDocumentMapping = response.staffDocumentMappings[i];
                    this.documents.push({
                        ExpiredDate: staffDocumentMapping.expiredDate,
                        File: staffDocumentMapping.name,
                        FileType: this.fileTypes[staffDocumentMapping.fileType],
                        MetaData: staffDocumentMapping.metaData,
                        Name: staffDocumentMapping.name,
                        FileData: staffDocumentMapping.fileUrl,
                        FileUrl: staffDocumentMapping.fileUrl
                    });
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    hasError(fieldName) {
        var id = staff_management_information_model_1.StaffManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = staff_management_information_model_1.StaffManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new staff_management_information_model_1.StaffManagementResponse();
        }
    }
    getInitialDataForAddOrEditStaff() {
        this.loaderService.toggleLoader(true);
        this.staffManagementService.getInitialDataForAddOrEditStaff().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    selectTab(tab) {
        this.selectedTab = tab;
    }
    isSameAsPermanent() {
        if (this.addStaff.IsPresentAddressIsSameAsPermanent) {
            if (this.addStaff.PermanentAddress) {
                this.addStaff.PresentAddress = JSON.parse(JSON.stringify(this.addStaff.PermanentAddress));
            }
            else {
                this.addStaff.PresentAddress = "dummy";
            }
            if (this.addStaff.PermanentZipcode) {
                this.addStaff.PresentZipcode = JSON.parse(JSON.stringify(this.addStaff.PermanentZipcode));
            }
            else {
                this.addStaff.PresentZipcode = '';
            }
            if (this.addStaff.PermanentCityId) {
                this.addStaff.PresentCityId = JSON.parse(JSON.stringify(this.addStaff.PermanentCityId));
            }
        }
        else {
            this.addStaff.PresentAddress = '';
            this.addStaff.PresentZipcode = '';
            this.addStaff.PresentCityId = undefined;
        }
    }
    addExperienceCard() {
        var anyEdit = this.experienceList.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForExperience = '';
            const experience = new staff_management_information_model_1.AddStaffExperienceMappingAc();
            experience.Id = this.experienceId;
            experience.IsEdit = true;
            this.experienceId++;
            this.experienceList.push(experience);
        }
        else {
            this.errorMessageForExperience = 'Another card is on process';
        }
    }
    saveExperience(experience) {
        experience.IsEdit = false;
    }
    editExperience(experience) {
        var anyEdit = this.experienceList.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForExperience = '';
            this.tempExperience = JSON.parse(JSON.stringify(experience));
            experience.IsEdit = true;
        }
        else {
            this.errorMessageForExperience = 'Another card is on process';
        }
    }
    unEditExperience(experience) {
        if (this.tempExperience.InstituteName) {
            var index = this.experienceList.findIndex(x => x.Id === experience.Id);
            this.experienceList[index].InstituteName = JSON.parse(JSON.stringify(this.tempExperience.InstituteName));
            this.experienceList[index].IsEdit = false;
            this.tempExperience = new staff_management_information_model_1.AddStaffExperienceMappingAc();
        }
        else {
            experience.IsEdit = false;
            if (!experience.InstituteName || !experience.StartDate || !experience.EndDate) {
                this.removeExperience(experience);
            }
        }
    }
    removeExperience(experience) {
        var index = this.experienceList.findIndex(x => x.Id === experience.Id);
        this.experienceList.splice(index, 1);
    }
    isAllowedToSave() {
        var anyEdit = this.experienceList.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    updateStaff() {
        this.loaderService.toggleLoader(true);
        this.addStaff.AddStaffExperienceMappings = this.experienceList;
        this.staffManagementService.updateStaff(this.addStaff).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addOrUpdateStaffImage(this.addStaff.Id, response.message);
            }
            else {
                if (response.errorType <= 11) {
                    this.selectedTab = 0;
                }
                else if (response.errorType === 15) {
                    this.selectedTab = 2;
                }
                else {
                    this.selectedTab = 1;
                }
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    checkStartDateEndDate(experience) {
        if (experience.EndDate) {
            if (experience.EndDate < experience.StartDate) {
                experience.EndDate = JSON.parse(JSON.stringify(experience.StartDate));
            }
        }
    }
    addOrUpdateStaffImage(staffId, message) {
        this.loaderService.toggleLoader(true);
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            this.staffManagementService.addOrUpdateStaffImage(staffId, formData).then(res => {
                this.addOrUpdateStaffGallery(staffId, message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.addOrUpdateStaffGallery(staffId, message);
            this.loaderService.toggleLoader(false);
        }
    }
    preview(files) {
        if (files.length === 0)
            return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        };
    }
    addOrUpdateStaffGallery(staffId, message) {
        this.loaderService.toggleLoader(true);
        const files = this.imageFiles;
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.file.name, file.file);
            }
            this.staffManagementService.addOrUpdateStaffGallery(staffId, formData).then(res => {
                this.updateDocumentData(staffId, message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.updateDocumentData(staffId, message);
            this.loaderService.toggleLoader(false);
        }
    }
    previewGallery() {
        var files = this.gallery.nativeElement.files;
        var duplicateCopy = [];
        if (files && files[0]) {
            for (let i = 0; i < files.length; i++) {
                var fileDetail = files[i];
                duplicateCopy.push(fileDetail);
                var reader = new FileReader();
                reader.onload = (event) => {
                    var result = event.target.result;
                    this.gallerys.push({ id: this.imageId, image: result, previousId: 0 });
                    var file = duplicateCopy[i];
                    this.imageFiles.push({ id: this.imageId, file: file });
                    this.imageId++;
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }
    removeImage(id) {
        var image = this.imageFiles.find(x => x.id === id);
        if (image) {
            var index = this.imageFiles.indexOf(image);
            this.imageFiles.splice(index, 1);
        }
        var viewImage = this.gallerys.find(x => x.id === id);
        var viewImageIndex = this.gallerys.indexOf(viewImage);
        this.gallerys.splice(viewImageIndex, 1);
        if (viewImage.previousId && viewImage.previousId !== 0) {
            this.addStaff.GalleryImageToDelete.push(viewImage.previousId);
        }
    }
    updateDocumentData(staffId, message) {
        this.loaderService.toggleLoader(true);
        var documentToSave = [];
        for (var i = 0; i < this.documents.length; i++) {
            if (typeof this.documents[i].FileData === 'string') {
                documentToSave.push(this.documents[i]);
            }
        }
        this.staffManagementService.updateDocumentData(documentToSave, staffId).then(res => {
            this.addOrUpdateStaffDocument(staffId, message);
            this.loaderService.toggleLoader(false);
        });
    }
    addOrUpdateStaffDocument(staffId, message) {
        this.loaderService.toggleLoader(true);
        var documentToSave = [];
        for (var i = 0; i < this.documents.length; i++) {
            if (typeof this.documents[i].FileData !== 'string') {
                documentToSave.push(this.documents[i]);
            }
        }
        const files = documentToSave.map(x => x.FileData);
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            formData.append('model-document', JSON.stringify(documentToSave));
            this.staffManagementService.addOrUpdateStaffDocument(staffId, formData).then(res => {
                this.router.navigate(['staff', 'master', 'list']);
                this.snackBar.showSnackbar(message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.router.navigate(['staff', 'master', 'list']);
            this.snackBar.showSnackbar(message);
            this.loaderService.toggleLoader(false);
        }
    }
    previewDocument() {
        var files = this.document.nativeElement.files;
        if (files && files[0]) {
            for (var i = 0; i < files.length; i++) {
                var doc = new staff_management_information_model_1.AddStaffDocumentMappingAc();
                doc.File = files[i].name;
                doc.Name = files[i].name;
                doc.FileData = files[i];
                doc.FileType = this.fileTypes[1];
                this.documents.push(doc);
            }
        }
    }
    removeDocument(index) {
        this.documents.splice(index, 1);
    }
    downloadFile(url) {
        if (url) {
            var fileurl = location.origin + '/' + url;
            window.open(fileurl);
        }
    }
    changeIssueDate() {
        if (this.addStaff.PassportIssuedDate) {
            if (this.addStaff.PassportIssuedDate > this.addStaff.PassportExpireDate) {
                this.addStaff.PassportExpireDate = this.addStaff.PassportIssuedDate;
            }
        }
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStaffManagementInformationComponent.prototype, "fileInput", void 0);
__decorate([
    core_1.ViewChild('gallery'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStaffManagementInformationComponent.prototype, "gallery", void 0);
__decorate([
    core_1.ViewChild('document'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStaffManagementInformationComponent.prototype, "document", void 0);
EditAndDetailStaffManagementInformationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-information-edit-detail.html'
    }),
    __metadata("design:paramtypes", [staff_management_information_service_1.StaffManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailStaffManagementInformationComponent);
exports.EditAndDetailStaffManagementInformationComponent = EditAndDetailStaffManagementInformationComponent;
//# sourceMappingURL=staff-management-information-edit-detail.component.js.map