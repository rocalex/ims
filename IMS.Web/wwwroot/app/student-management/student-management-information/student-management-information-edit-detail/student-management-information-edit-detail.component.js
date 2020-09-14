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
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const student_management_information_service_1 = require("../student-management-information.service");
const student_management_information_model_1 = require("../student-management-information.model");
let EditAndDetailStudentInformationManagementComponent = class EditAndDetailStudentInformationManagementComponent {
    constructor(studentManagementService, loaderService, router, location, snackBar) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.location = location;
        this.snackBar = snackBar;
        this.currentDate = new Date();
        this.error = new student_management_information_model_1.StudentManagementResponse();
        this.selectedTab = 0;
        this.initialData = {};
        this.addStudent = new student_management_information_model_1.UpdateStudentManagementAc();
        this.familyRelationTypes = [student_management_information_model_1.FamilyRelationTypeEnum[student_management_information_model_1.FamilyRelationTypeEnum.Father], student_management_information_model_1.FamilyRelationTypeEnum[student_management_information_model_1.FamilyRelationTypeEnum.Mother],
            student_management_information_model_1.FamilyRelationTypeEnum[student_management_information_model_1.FamilyRelationTypeEnum.Sibling], student_management_information_model_1.FamilyRelationTypeEnum[student_management_information_model_1.FamilyRelationTypeEnum.Other]];
        this.relievingTypes = [student_management_information_model_1.RelievingTypeEnum[student_management_information_model_1.RelievingTypeEnum.PassOut, student_management_information_model_1.RelievingTypeEnum.Transfer]];
        this.studentPriorEducations = [];
        this.studentPriorEducationId = 0;
        this.tempStudentPriorEducation = new student_management_information_model_1.AddStudentPriorEducationAc();
        this.errorMessageForStudentPriorEducation = '';
        this.studentSports = [];
        this.studentSportId = 0;
        this.tempStudentSport = new student_management_information_model_1.AddStudentSportAc();
        this.errorMessageForStudentSport = '';
        this.studentAwards = [];
        this.studentAwardId = 0;
        this.tempStudentAward = new student_management_information_model_1.AddStudentAwardAc();
        this.errorMessageForStudentAward = '';
        this.studentDisciplines = [];
        this.tempStudentDiscipline = new student_management_information_model_1.AddStudentDisciplineAc();
        this.errorMessageForStudentDiscipline = '';
        this.gallerys = [];
        this.imageId = 1;
        this.imageFiles = [];
        this.documents = [];
        this.fileTypes = ['Image', 'File'];
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.addStudent.Id = +(path[3]);
        this.getInitialDataForAddOrEditStudentBundle();
    }
    getStudentDetail() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentDetail(this.addStudent.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['student', 'information', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.assignValue(response);
                this.imgURL = response.personalImage;
                for (var i = 0; i < response.studentDocumentMappings.length; i++) {
                    var studentDocumentMapping = response.studentDocumentMappings[i];
                    this.documents.push({
                        ExpiredDate: studentDocumentMapping.expiredDate,
                        File: studentDocumentMapping.name,
                        FileType: this.fileTypes[studentDocumentMapping.fileType],
                        MetaData: studentDocumentMapping.metaData,
                        Name: studentDocumentMapping.name,
                        FileData: studentDocumentMapping.fileUrl,
                        FileUrl: studentDocumentMapping.fileUrl
                    });
                }
                for (var i = 0; i < response.studentGalleries.length; i++) {
                    this.gallerys.push({ id: this.imageId, image: response.studentGalleries[i].imageUrl, previousId: response.studentGalleries[i].id });
                    this.imageId++;
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    backPage() {
        this.location.back();
    }
    checkWhiteSpace(nameModel, name) {
        if (name) {
            if (name.trim() === '') {
                nameModel.whiteSpaceError = true;
            }
            else {
                nameModel.whiteSpaceError = false;
            }
        }
    }
    hasError(fieldName) {
        var id = student_management_information_model_1.StudentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = student_management_information_model_1.StudentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new student_management_information_model_1.StudentManagementResponse();
        }
    }
    getInitialDataForAddOrEditStudentBundle() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getInitialDataForAddOrEditStudentBundle().then(res => {
            this.initialData = res.json();
            this.getStudentDetail();
            this.loaderService.toggleLoader(false);
        });
    }
    selectTab(tab) {
        this.selectedTab = tab;
    }
    isSameAsPermanent() {
        if (this.addStudent.IsPresentAddressIsSameAsPermanent) {
            if (this.addStudent.PermanentAddress) {
                this.addStudent.PresentAddress = JSON.parse(JSON.stringify(this.addStudent.PermanentAddress));
            }
            else {
                this.addStudent.PresentAddress = "dummy";
            }
            if (this.addStudent.PermanentZipcode) {
                this.addStudent.PresentZipcode = JSON.parse(JSON.stringify(this.addStudent.PermanentZipcode));
            }
            else {
                this.addStudent.PresentZipcode = "dummy";
            }
            if (this.addStudent.PermanentCityId) {
                this.addStudent.PresentCityId = JSON.parse(JSON.stringify(this.addStudent.PermanentCityId));
            }
        }
    }
    addStudentPriorEducationCard() {
        var anyEdit = this.studentPriorEducations.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            const StudentPriorEducation = new student_management_information_model_1.AddStudentPriorEducationAc();
            StudentPriorEducation.Id = this.studentPriorEducationId;
            StudentPriorEducation.IsEdit = true;
            this.studentPriorEducationId++;
            this.studentPriorEducations.push(StudentPriorEducation);
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    saveStudentPriorEducation(StudentPriorEducation) {
        StudentPriorEducation.IsEdit = false;
    }
    editStudentPriorEducation(StudentPriorEducation) {
        var anyEdit = this.studentPriorEducations.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            this.tempStudentPriorEducation = JSON.parse(JSON.stringify(StudentPriorEducation));
            StudentPriorEducation.IsEdit = true;
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    unEditStudentPriorEducation(StudentPriorEducation) {
        if (this.tempStudentPriorEducation.InstituteName) {
            var index = this.studentPriorEducations.findIndex(x => x.Id === StudentPriorEducation.Id);
            this.studentPriorEducations[index].InstituteName = JSON.parse(JSON.stringify(this.tempStudentPriorEducation.InstituteName));
            this.studentPriorEducations[index].IsEdit = false;
            this.tempStudentPriorEducation = new student_management_information_model_1.AddStudentPriorEducationAc();
        }
        else {
            StudentPriorEducation.IsEdit = false;
            if (!StudentPriorEducation.InstituteName || !StudentPriorEducation.FromDate || !StudentPriorEducation.ToDate) {
                this.removeStudentPriorEducation(StudentPriorEducation);
            }
        }
    }
    removeStudentPriorEducation(StudentPriorEducation) {
        var index = this.studentPriorEducations.findIndex(x => x.Id === StudentPriorEducation.Id);
        this.studentPriorEducations.splice(index, 1);
    }
    isAllowedToSaveStudentPriorEducation() {
        var anyEdit = this.studentPriorEducations.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    addStudentSportCard() {
        var anyEdit = this.studentSports.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            const studentSport = new student_management_information_model_1.AddStudentSportAc();
            studentSport.Id = this.studentSportId;
            studentSport.IsEdit = true;
            this.studentSportId++;
            this.studentSports.push(studentSport);
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    saveStudentSport(studentSport) {
        studentSport.IsEdit = false;
    }
    editStudentSport(studentSport) {
        var anyEdit = this.studentSports.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            this.tempStudentSport = JSON.parse(JSON.stringify(studentSport));
            studentSport.IsEdit = true;
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    unEditStudentSport(studentSport) {
        if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
            var index = this.studentSports.findIndex(x => x.Id === studentSport.Id);
            this.studentSports[index].SportId = JSON.parse(JSON.stringify(this.tempStudentSport.SportId));
            this.studentSports[index].LevelId = JSON.parse(JSON.stringify(this.tempStudentSport.LevelId));
            this.studentSports[index].IsEdit = false;
            this.tempStudentSport = new student_management_information_model_1.AddStudentSportAc();
        }
        else {
            studentSport.IsEdit = false;
            if (!studentSport.LevelId || !studentSport.SportId) {
                this.removeStudentSport(studentSport);
            }
        }
    }
    removeStudentSport(studentSport) {
        var index = this.studentSports.findIndex(x => x.Id === studentSport.Id);
        this.studentSports.splice(index, 1);
    }
    isAllowedToSaveStudentSport() {
        var anyEdit = this.studentSports.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    getSportAndLevelNameById(id, isSport) {
        if (isSport) {
            var data = this.initialData.sports.find(x => x.id === id);
            return data.name;
        }
        else {
            var data = this.initialData.levels.find(x => x.id === id);
            return data.name;
        }
    }
    addStudentAwardCard() {
        var anyEdit = this.studentAwards.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            const studentAward = new student_management_information_model_1.AddStudentAwardAc();
            studentAward.Id = this.studentAwardId;
            studentAward.IsEdit = true;
            this.studentAwardId++;
            this.studentAwards.push(studentAward);
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    saveStudentAward(studentAward) {
        studentAward.IsEdit = false;
    }
    editStudentAward(studentAward) {
        var anyEdit = this.studentAwards.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            this.tempStudentAward = JSON.parse(JSON.stringify(studentAward));
            studentAward.IsEdit = true;
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    unEditStudentAward(studentAward) {
        if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
            var index = this.studentAwards.findIndex(x => x.Id === studentAward.Id);
            this.studentAwards[index].InstituteName = JSON.parse(JSON.stringify(this.tempStudentAward.InstituteName));
            this.studentAwards[index].AwardName = JSON.parse(JSON.stringify(this.tempStudentAward.AwardName));
            this.studentAwards[index].IsEdit = false;
            this.tempStudentAward = new student_management_information_model_1.AddStudentAwardAc();
        }
        else {
            studentAward.IsEdit = false;
            if (!studentAward.AwardName || !studentAward.InstituteName) {
                this.removeStudentAward(studentAward);
            }
        }
    }
    removeStudentAward(studentAward) {
        var index = this.studentAwards.findIndex(x => x.Id === studentAward.Id);
        this.studentAwards.splice(index, 1);
    }
    isAllowedToSaveStudentAward() {
        var anyEdit = this.studentAwards.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    addStudentDisciplineCard() {
        var anyEdit = this.studentDisciplines.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            const studentDiscipline = new student_management_information_model_1.AddStudentDisciplineAc();
            studentDiscipline.Id = this.studentAwardId;
            studentDiscipline.IsEdit = true;
            this.studentAwardId++;
            this.studentDisciplines.push(studentDiscipline);
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    saveStudentDiscipline(studentDiscipline) {
        studentDiscipline.IsEdit = false;
    }
    editStudentDiscipline(studentDiscipline) {
        var anyEdit = this.studentDisciplines.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForStudentPriorEducation = '';
            this.tempStudentDiscipline = JSON.parse(JSON.stringify(studentDiscipline));
            studentDiscipline.IsEdit = true;
        }
        else {
            this.errorMessageForStudentPriorEducation = 'Another card is on process';
        }
    }
    unEditStudentDiscipline(studentDiscipline) {
        if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
            var index = this.studentDisciplines.findIndex(x => x.Id === studentDiscipline.Id);
            this.studentDisciplines[index].Subject = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Subject));
            this.studentDisciplines[index].Date = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Date));
            this.studentDisciplines[index].Description = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Description));
            this.studentDisciplines[index].Remarks = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Remarks));
            this.studentDisciplines[index].StatusId = JSON.parse(JSON.stringify(this.tempStudentDiscipline.StatusId));
            this.studentDisciplines[index].IsEdit = false;
            this.tempStudentDiscipline = new student_management_information_model_1.AddStudentDisciplineAc();
        }
        else {
            studentDiscipline.IsEdit = false;
            if (!studentDiscipline.Subject || !studentDiscipline.Date || !studentDiscipline.Description
                || !studentDiscipline.Remarks || !studentDiscipline.StatusId) {
                this.removeStudentDiscipline(studentDiscipline);
            }
        }
    }
    removeStudentDiscipline(studentDiscipline) {
        var index = this.studentDisciplines.findIndex(x => x.Id === studentDiscipline.Id);
        this.studentDisciplines.splice(index, 1);
    }
    isAllowedToSaveStudentDiscipline() {
        var anyEdit = this.studentDisciplines.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    assignValue(value) {
        this.addStudent.RollNumber = value.rollNumber;
        this.addStudent.AdmissionDate = value.admissionDate;
        this.addStudent.AdmissionNumber = value.admissionNumber;
        this.addStudent.AdmissionClassId = value.admissionClassId;
        this.addStudent.CurrentClassId = value.currentClassId;
        this.addStudent.SectionId = value.sectionId;
        this.addStudent.CurrentAcademicYearId = value.currentAcademicYearId;
        this.addStudent.FirstLanguageId = value.firstLanguageId;
        this.addStudent.SecondLanguageId = value.secondLanguageId;
        this.addStudent.FirstName = value.firstName;
        this.addStudent.MiddleName = value.middleName;
        this.addStudent.LastName = value.lastName;
        this.addStudent.DateOfBirth = value.dateOfBirth;
        this.addStudent.GenderId = value.genderId;
        this.addStudent.MaritalStatusId = value.maritalStatusId;
        this.addStudent.IsPhysicallyHandicapped = value.isPhysicallyHandicapped;
        this.addStudent.SchoolApplicationNumber = value.schoolApplicationNumber;
        this.addStudent.FeeChallanNumber = value.feeChallanNumber;
        this.addStudent.NationalityId = value.nationalityId;
        this.addStudent.SocialSecurityNumber = value.socialSecurityNumber;
        this.addStudent.MotherTongueId = value.motherTongueId;
        this.addStudent.ReligionId = value.religionId;
        this.addStudent.CasteId = value.casteId;
        this.addStudent.BloodGroupId = value.bloodGroupId;
        this.addStudent.ComingBy = value.comingBy;
        this.addStudent.ComingPlace = value.comingPlace;
        this.addStudent.IdentificationMarks = value.identificationMarks;
        this.addStudent.PassportNumber = value.passportNumber;
        this.addStudent.PassportIssuedCountryId = value.passportIssuedCountryId;
        this.addStudent.PassportIssuedDate = value.passportIssuedDate;
        this.addStudent.PassportExpireDate = value.passportExpireDate;
        this.addStudent.RelievingDate = value.relievingDate;
        this.addStudent.RelievingClassId = value.relievingClassId;
        this.addStudent.TCNumber = value.tcNumber;
        this.addStudent.TCDate = value.tcDate;
        this.selectedRelievingType = student_management_information_model_1.RelievingTypeEnum[value.relievingType];
        this.addStudent.RelievingReason = value.relievingReason;
        this.selectedFamilyRelationType = student_management_information_model_1.FamilyRelationTypeEnum[value.familyRelationType];
        this.addStudent.MotherName = value.motherName;
        this.addStudent.FamilyRelationName = value.familyRelationName;
        this.addStudent.FamilyRelationEmail = value.familyRelationEmail;
        this.addStudent.FamilyRelationMobileNumber = value.familyRelationMobileNumber;
        this.addStudent.FamilyRelationOccupationId = value.familyRelationOccupationId;
        this.addStudent.FamilyRelationMonthlyIncome = value.familyRelationMonthlyIncome;
        this.addStudent.PermanentAddress = value.permanentAddress;
        this.addStudent.PermanentCityId = value.permanentCityId;
        this.addStudent.PermanentZipcode = value.permanentZipcode;
        this.addStudent.MobileNumber = value.mobileNumber;
        this.addStudent.AlternatePhoneNumber = value.alternatePhoneNumber;
        this.addStudent.IsPresentAddressIsSameAsPermanent = value.isPresentAddressIsSameAsPermanent;
        this.addStudent.PresentAddress = value.presentAddress;
        this.addStudent.PresentCityId = value.presentCityId;
        this.addStudent.PresentZipcode = value.presentZipcode;
        for (var i = 0; i < value.studentPriorEducations.length; i++) {
            var priorData = new student_management_information_model_1.AddStudentPriorEducationAc();
            priorData.FromDate = value.studentPriorEducations[i].fromDate;
            priorData.InstituteName = value.studentPriorEducations[i].instituteName;
            priorData.ToDate = value.studentPriorEducations[i].toDate;
            this.studentPriorEducations.push(priorData);
        }
        for (var i = 0; i < value.studentSports.length; i++) {
            var sportData = new student_management_information_model_1.AddStudentSportAc();
            sportData.LevelId = value.studentSports[i].levelId;
            sportData.SportId = value.studentSports[i].sportId;
            this.studentSports.push(sportData);
        }
        for (var i = 0; i < value.studentAwards.length; i++) {
            var awardData = new student_management_information_model_1.AddStudentAwardAc();
            awardData.AwardName = value.studentAwards[i].awardName;
            awardData.InstituteName = value.studentAwards[i].instituteName;
            this.studentAwards.push(awardData);
        }
        for (var i = 0; i < value.studentDisciplines.length; i++) {
            var data = new student_management_information_model_1.AddStudentDisciplineAc();
            data.Date = value.studentDisciplines[i].date;
            data.Description = value.studentDisciplines[i].description;
            data.Remarks = value.studentDisciplines[i].remarks;
            data.StatusId = value.studentDisciplines[i].statusId;
            data.Subject = value.studentDisciplines[i].subject;
            this.studentDisciplines.push(data);
        }
    }
    updateStudent() {
        this.loaderService.toggleLoader(true);
        this.addStudent.FamilyRelationType = student_management_information_model_1.FamilyRelationTypeEnum[this.selectedFamilyRelationType];
        if (this.selectedRelievingType) {
            this.addStudent.RelievingType = student_management_information_model_1.RelievingTypeEnum[this.selectedRelievingType];
        }
        this.addStudent.AdmissionDate = this.convertDateToUtc(this.addStudent.AdmissionDate);
        this.addStudent.DateOfBirth = this.convertDateToUtc(this.addStudent.DateOfBirth);
        this.addStudent.PassportExpireDate = this.convertDateToUtc(this.addStudent.PassportExpireDate);
        this.addStudent.PassportIssuedDate = this.convertDateToUtc(this.addStudent.PassportIssuedDate);
        this.addStudent.RelievingDate = this.convertDateToUtc(this.addStudent.RelievingDate);
        this.addStudent.TCDate = this.convertDateToUtc(this.addStudent.TCDate);
        for (var i = 0; i < this.studentPriorEducations.length; i++) {
            this.studentPriorEducations[i].FromDate = this.convertDateToUtc(this.studentPriorEducations[i].FromDate);
            this.studentPriorEducations[i].ToDate = this.convertDateToUtc(this.studentPriorEducations[i].ToDate);
        }
        this.addStudent.StudentPriorEducations = this.studentPriorEducations;
        this.addStudent.StudentSports = this.studentSports;
        this.addStudent.StudentAwards = this.studentAwards;
        for (var i = 0; i < this.studentDisciplines.length; i++) {
            this.studentDisciplines[i].Date = this.convertDateToUtc(this.studentDisciplines[i].Date);
        }
        this.addStudent.StudentDisciplines = this.studentDisciplines;
        this.studentManagementService.updateStudent(this.addStudent).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addOrUpdateStudentImage(this.addStudent.Id, response.message);
            }
            else {
                if (response.errorType <= 17) {
                    this.selectedTab = 0;
                }
                else if (response.errorType >= 18 && response.errorType <= 25) {
                    this.selectedTab = 1;
                }
                else if (response.errorType === 26) {
                    this.selectedTab = 2;
                }
                else if (response.errorType === 27) {
                    this.selectedTab = 4;
                }
                else {
                    this.selectedTab = 3;
                }
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    addOrUpdateStudentImage(studentId, message) {
        this.loaderService.toggleLoader(true);
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            this.studentManagementService.addOrUpdateStudentImage(studentId, formData).then(res => {
                this.addOrUpdateStaffGallery(studentId, message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.addOrUpdateStaffGallery(studentId, message);
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
    addOrUpdateStaffGallery(studentId, message) {
        this.loaderService.toggleLoader(true);
        const files = this.imageFiles;
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.file.name, file.file);
            }
            this.studentManagementService.addOrUpdateStudentGallery(studentId, formData).then(res => {
                this.updateDocumentData(studentId, message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.updateDocumentData(studentId, message);
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
            this.addStudent.GalleryImageToDelete.push(viewImage.previousId);
        }
    }
    isRemarkDisbale(studentDiscipline) {
        if (studentDiscipline.StatusId) {
            var status = this.initialData.statuses.find(x => x.id === studentDiscipline.StatusId);
            if (status.name === 'Open') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    updateDocumentData(studentId, message) {
        this.loaderService.toggleLoader(true);
        var documentToSave = [];
        for (var i = 0; i < this.documents.length; i++) {
            if (typeof this.documents[i].FileData === 'string') {
                documentToSave.push(this.documents[i]);
            }
        }
        this.studentManagementService.updateDocumentData(documentToSave, studentId).then(res => {
            this.addOrUpdateStudentDocument(studentId, message);
            this.loaderService.toggleLoader(false);
        });
    }
    addOrUpdateStudentDocument(studentId, message) {
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
            this.studentManagementService.addOrUpdateStudentDocument(studentId, formData).then(res => {
                this.router.navigate(['student', 'information', 'list']);
                this.snackBar.showSnackbar(message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.router.navigate(['student', 'information', 'list']);
            this.snackBar.showSnackbar(message);
            this.loaderService.toggleLoader(false);
        }
    }
    previewDocument() {
        var files = this.document.nativeElement.files;
        if (files && files[0]) {
            for (var i = 0; i < files.length; i++) {
                var doc = new student_management_information_model_1.AddStudentDocumentMappingAc();
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
        if (this.addStudent.PassportIssuedDate) {
            if (this.addStudent.PassportIssuedDate > this.addStudent.PassportExpireDate) {
                this.addStudent.PassportExpireDate = this.addStudent.PassportIssuedDate;
            }
        }
    }
    convertDateToUtc(dateString) {
        if (dateString) {
            var date = new Date(dateString);
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        }
        else {
            return dateString;
        }
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStudentInformationManagementComponent.prototype, "fileInput", void 0);
__decorate([
    core_1.ViewChild('gallery'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStudentInformationManagementComponent.prototype, "gallery", void 0);
__decorate([
    core_1.ViewChild('document'),
    __metadata("design:type", core_1.ElementRef)
], EditAndDetailStudentInformationManagementComponent.prototype, "document", void 0);
EditAndDetailStudentInformationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-information-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_information_service_1.StudentManagementService, loader_service_1.LoaderService,
        router_1.Router, common_1.Location, snackbar_service_1.SnackbarService])
], EditAndDetailStudentInformationManagementComponent);
exports.EditAndDetailStudentInformationManagementComponent = EditAndDetailStudentInformationManagementComponent;
//# sourceMappingURL=student-management-information-edit-detail.component.js.map