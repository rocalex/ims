import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentManagementService } from '../student-management-information.service';
import {
  StudentManagementResponseType, StudentManagementResponse, UpdateStudentManagementAc, StudentSectionEnum,
  MaritalStatusEnum,

  FamilyRelationTypeEnum,
  RelievingTypeEnum,
  AddStudentPriorEducationAc,
  AddStudentSportAc,
  AddStudentAwardAc,
  AddStudentDisciplineAc,
  AddStudentDocumentMappingAc
} from '../student-management-information.model';
import { validateConfig } from '@angular/router/src/config';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-information-edit-detail.html'
})
export class EditAndDetailStudentInformationManagementComponent implements OnInit {
  currentDate: Date = new Date();
  error: StudentManagementResponse = new StudentManagementResponse();
  selectedTab: number = 0;
  initialData: any = {};
  addStudent: UpdateStudentManagementAc = new UpdateStudentManagementAc();
  familyRelationTypes: string[] = [FamilyRelationTypeEnum[FamilyRelationTypeEnum.Father], FamilyRelationTypeEnum[FamilyRelationTypeEnum.Mother],
  FamilyRelationTypeEnum[FamilyRelationTypeEnum.Sibling], FamilyRelationTypeEnum[FamilyRelationTypeEnum.Other]];
  selectedFamilyRelationType: string;
  relievingTypes: string[] = [RelievingTypeEnum[RelievingTypeEnum.PassOut, RelievingTypeEnum.Transfer]];
  selectedRelievingType: string;

  studentPriorEducations: AddStudentPriorEducationAc[] = [];
  studentPriorEducationId: number = 0;
  tempStudentPriorEducation = new AddStudentPriorEducationAc();
  errorMessageForStudentPriorEducation: string = '';

  studentSports: AddStudentSportAc[] = [];
  studentSportId: number = 0;
  tempStudentSport: AddStudentSportAc = new AddStudentSportAc();
  errorMessageForStudentSport: string = '';

  studentAwards: AddStudentAwardAc[] = [];
  studentAwardId: number = 0;
  tempStudentAward: AddStudentAwardAc = new AddStudentAwardAc();
  errorMessageForStudentAward: string = '';

  studentDisciplines: AddStudentDisciplineAc[] = [];
  studentDisciplineId: number;
  tempStudentDiscipline: AddStudentDisciplineAc = new AddStudentDisciplineAc();
  errorMessageForStudentDiscipline: string = '';
  @ViewChild('fileInput') fileInput: ElementRef;
  imgURL: any;
  @ViewChild('gallery') gallery: ElementRef;
  gallerys: any[] = [];
  imageId: number = 1;
  imageFiles: any[] = [];

  @ViewChild('document') document: ElementRef;
  documents: AddStudentDocumentMappingAc[] = [];
  fileTypes: string[] = ['Image', 'File'];
  constructor(private studentManagementService: StudentManagementService, private loaderService: LoaderService,
    private router: Router, private location: Location, private snackBar: SnackbarService) {
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
      } else {
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
    })
  }
  
  backPage() {
    this.location.back();
  }

  checkWhiteSpace(nameModel: any, name: string) {
    if (name) {
      if (name.trim() === '') {
        nameModel.whiteSpaceError = true;
      } else {
        nameModel.whiteSpaceError = false;
      }
    }
  }

  hasError(fieldName: string) {
    var id = StudentManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = StudentManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new StudentManagementResponse();
    }
  }

  getInitialDataForAddOrEditStudentBundle() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getInitialDataForAddOrEditStudentBundle().then(res => {
      this.initialData = res.json();
      this.getStudentDetail();
      this.loaderService.toggleLoader(false);
    })
  }

  selectTab(tab: number) {
    this.selectedTab = tab;
  }

  isSameAsPermanent() {
    if (this.addStudent.IsPresentAddressIsSameAsPermanent) {
      if (this.addStudent.PermanentAddress) {
        this.addStudent.PresentAddress = JSON.parse(JSON.stringify(this.addStudent.PermanentAddress));
      } else {
        this.addStudent.PresentAddress = "dummy";
      }
      if (this.addStudent.PermanentZipcode) {
        this.addStudent.PresentZipcode = JSON.parse(JSON.stringify(this.addStudent.PermanentZipcode));
      } else {
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
      const StudentPriorEducation: AddStudentPriorEducationAc = new AddStudentPriorEducationAc();
      StudentPriorEducation.Id = this.studentPriorEducationId;
      StudentPriorEducation.IsEdit = true;
      this.studentPriorEducationId++;
      this.studentPriorEducations.push(StudentPriorEducation);
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  saveStudentPriorEducation(StudentPriorEducation: AddStudentPriorEducationAc) {
    StudentPriorEducation.IsEdit = false
  }

  editStudentPriorEducation(StudentPriorEducation: AddStudentPriorEducationAc) {
    var anyEdit = this.studentPriorEducations.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForStudentPriorEducation = '';
      this.tempStudentPriorEducation = JSON.parse(JSON.stringify(StudentPriorEducation));
      StudentPriorEducation.IsEdit = true;
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  unEditStudentPriorEducation(StudentPriorEducation: AddStudentPriorEducationAc) {
    if (this.tempStudentPriorEducation.InstituteName) {
      var index = this.studentPriorEducations.findIndex(x => x.Id === StudentPriorEducation.Id);
      this.studentPriorEducations[index].InstituteName = JSON.parse(JSON.stringify(this.tempStudentPriorEducation.InstituteName));
      this.studentPriorEducations[index].IsEdit = false;
      this.tempStudentPriorEducation = new AddStudentPriorEducationAc();
    } else {
      StudentPriorEducation.IsEdit = false;
      if (!StudentPriorEducation.InstituteName || !StudentPriorEducation.FromDate || !StudentPriorEducation.ToDate) {
        this.removeStudentPriorEducation(StudentPriorEducation);
      }
    }
  }

  removeStudentPriorEducation(StudentPriorEducation: AddStudentPriorEducationAc) {
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
      const studentSport: AddStudentSportAc = new AddStudentSportAc();
      studentSport.Id = this.studentSportId;
      studentSport.IsEdit = true;
      this.studentSportId++;
      this.studentSports.push(studentSport);
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  saveStudentSport(studentSport: AddStudentSportAc) {
    studentSport.IsEdit = false
  }

  editStudentSport(studentSport: AddStudentSportAc) {
    var anyEdit = this.studentSports.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForStudentPriorEducation = '';
      this.tempStudentSport = JSON.parse(JSON.stringify(studentSport));
      studentSport.IsEdit = true;
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  unEditStudentSport(studentSport: AddStudentSportAc) {
    if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
      var index = this.studentSports.findIndex(x => x.Id === studentSport.Id);
      this.studentSports[index].SportId = JSON.parse(JSON.stringify(this.tempStudentSport.SportId));
      this.studentSports[index].LevelId = JSON.parse(JSON.stringify(this.tempStudentSport.LevelId));
      this.studentSports[index].IsEdit = false;
      this.tempStudentSport = new AddStudentSportAc();
    } else {
      studentSport.IsEdit = false;
      if (!studentSport.LevelId || !studentSport.SportId) {
        this.removeStudentSport(studentSport);
      }
    }
  }

  removeStudentSport(studentSport: AddStudentSportAc) {
    var index = this.studentSports.findIndex(x => x.Id === studentSport.Id);
    this.studentSports.splice(index, 1);
  }

  isAllowedToSaveStudentSport() {
    var anyEdit = this.studentSports.filter(x => x.IsEdit === true);
    return (anyEdit.length === 0);
  }

  getSportAndLevelNameById(id: number, isSport: boolean) {
    if (isSport) {
      var data = this.initialData.sports.find(x => x.id === id);
      return data.name;
    } else {
      var data = this.initialData.levels.find(x => x.id === id);
      return data.name;
    }
  }

  addStudentAwardCard() {
    var anyEdit = this.studentAwards.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForStudentPriorEducation = '';
      const studentAward: AddStudentAwardAc = new AddStudentAwardAc();
      studentAward.Id = this.studentAwardId;
      studentAward.IsEdit = true;
      this.studentAwardId++;
      this.studentAwards.push(studentAward);
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  saveStudentAward(studentAward: AddStudentAwardAc) {
    studentAward.IsEdit = false
  }

  editStudentAward(studentAward: AddStudentAwardAc) {
    var anyEdit = this.studentAwards.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForStudentPriorEducation = '';
      this.tempStudentAward = JSON.parse(JSON.stringify(studentAward));
      studentAward.IsEdit = true;
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  unEditStudentAward(studentAward: AddStudentAwardAc) {
    if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
      var index = this.studentAwards.findIndex(x => x.Id === studentAward.Id);
      this.studentAwards[index].InstituteName = JSON.parse(JSON.stringify(this.tempStudentAward.InstituteName));
      this.studentAwards[index].AwardName = JSON.parse(JSON.stringify(this.tempStudentAward.AwardName));
      this.studentAwards[index].IsEdit = false;
      this.tempStudentAward = new AddStudentAwardAc();
    } else {
      studentAward.IsEdit = false;
      if (!studentAward.AwardName || !studentAward.InstituteName) {
        this.removeStudentAward(studentAward);
      }
    }
  }

  removeStudentAward(studentAward: AddStudentAwardAc) {
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
      const studentDiscipline: AddStudentDisciplineAc = new AddStudentDisciplineAc();
      studentDiscipline.Id = this.studentAwardId;
      studentDiscipline.IsEdit = true;
      this.studentAwardId++;
      this.studentDisciplines.push(studentDiscipline);
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  saveStudentDiscipline(studentDiscipline: AddStudentDisciplineAc) {
    studentDiscipline.IsEdit = false
  }

  editStudentDiscipline(studentDiscipline: AddStudentDisciplineAc) {
    var anyEdit = this.studentDisciplines.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForStudentPriorEducation = '';
      this.tempStudentDiscipline = JSON.parse(JSON.stringify(studentDiscipline));
      studentDiscipline.IsEdit = true;
    } else {
      this.errorMessageForStudentPriorEducation = 'Another card is on process';
    }
  }

  unEditStudentDiscipline(studentDiscipline: AddStudentDisciplineAc) {
    if (this.tempStudentSport.SportId && this.tempStudentSport.LevelId) {
      var index = this.studentDisciplines.findIndex(x => x.Id === studentDiscipline.Id);
      this.studentDisciplines[index].Subject = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Subject));
      this.studentDisciplines[index].Date = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Date));
      this.studentDisciplines[index].Description = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Description));
      this.studentDisciplines[index].Remarks = JSON.parse(JSON.stringify(this.tempStudentDiscipline.Remarks));
      this.studentDisciplines[index].StatusId = JSON.parse(JSON.stringify(this.tempStudentDiscipline.StatusId));
      this.studentDisciplines[index].IsEdit = false;
      this.tempStudentDiscipline = new AddStudentDisciplineAc();
    } else {
      studentDiscipline.IsEdit = false;
      if (!studentDiscipline.Subject || !studentDiscipline.Date || !studentDiscipline.Description
        || !studentDiscipline.Remarks || !studentDiscipline.StatusId) {
        this.removeStudentDiscipline(studentDiscipline);
      }
    }
  }

  removeStudentDiscipline(studentDiscipline: AddStudentDisciplineAc) {
    var index = this.studentDisciplines.findIndex(x => x.Id === studentDiscipline.Id);
    this.studentDisciplines.splice(index, 1);
  }

  isAllowedToSaveStudentDiscipline() {
    var anyEdit = this.studentDisciplines.filter(x => x.IsEdit === true);
    return (anyEdit.length === 0);
  }

  assignValue(value: any) {
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
    this.selectedRelievingType = RelievingTypeEnum[value.relievingType];
    this.addStudent.RelievingReason = value.relievingReason;
    this.selectedFamilyRelationType = FamilyRelationTypeEnum[value.familyRelationType];
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
    this.addStudent.PresentCityId = value.presentCityId
    this.addStudent.PresentZipcode = value.presentZipcode;
    for (var i = 0; i < value.studentPriorEducations.length; i++) {
      var priorData = new AddStudentPriorEducationAc();
      priorData.FromDate = value.studentPriorEducations[i].fromDate;
      priorData.InstituteName = value.studentPriorEducations[i].instituteName;
      priorData.ToDate = value.studentPriorEducations[i].toDate;
      this.studentPriorEducations.push(priorData);
    }
    for (var i = 0; i < value.studentSports.length; i++) {
      var sportData = new AddStudentSportAc();
      sportData.LevelId = value.studentSports[i].levelId;
      sportData.SportId = value.studentSports[i].sportId;
      this.studentSports.push(sportData);
    }
    for (var i = 0; i < value.studentAwards.length; i++) {
      var awardData = new AddStudentAwardAc();
      awardData.AwardName = value.studentAwards[i].awardName;
      awardData.InstituteName = value.studentAwards[i].instituteName;
      this.studentAwards.push(awardData);
    }
    for (var i = 0; i < value.studentDisciplines.length; i++) {
      var data = new AddStudentDisciplineAc();
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
    this.addStudent.FamilyRelationType = FamilyRelationTypeEnum[this.selectedFamilyRelationType];
    if (this.selectedRelievingType) {
      this.addStudent.RelievingType = RelievingTypeEnum[this.selectedRelievingType];
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
      } else {
        if (response.errorType <= 17) {
          this.selectedTab = 0;
        } else if (response.errorType >= 18 && response.errorType <= 25) {
          this.selectedTab = 1;
        } else if (response.errorType === 26) {
          this.selectedTab = 2;
        } else if (response.errorType === 27) {
          this.selectedTab = 4;
        } else {
          this.selectedTab = 3;
        }
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  addOrUpdateStudentImage(studentId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var files = this.fileInput.nativeElement.files;
    if (files.length !== 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.studentManagementService.addOrUpdateStudentImage(studentId, formData).then(res => {
        this.addOrUpdateStaffGallery(studentId, message)
        this.loaderService.toggleLoader(false);
      });
    } else {
      this.addOrUpdateStaffGallery(studentId, message)
      this.loaderService.toggleLoader(false);
    }
  }

  preview(files: any[]) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  addOrUpdateStaffGallery(studentId: number, message: string) {
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
    } else {
      this.updateDocumentData(studentId, message);
      this.loaderService.toggleLoader(false);
    }
  }

  previewGallery() {
    var files = this.gallery.nativeElement.files;
    var duplicateCopy: any[] = [];
    if (files && files[0]) {
      for (let i = 0; i < files.length; i++) {
        var fileDetail = files[i];
        duplicateCopy.push(fileDetail);
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          var result = (<FileReader>event.target).result;
          this.gallerys.push({ id: this.imageId, image: result, previousId: 0 });
          var file = duplicateCopy[i];
          this.imageFiles.push({ id: this.imageId, file: file });
          this.imageId++;
        }
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(id: number) {
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
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  updateDocumentData(studentId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddStudentDocumentMappingAc[] = [];
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

  addOrUpdateStudentDocument(studentId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddStudentDocumentMappingAc[] = [];
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
    } else {
      this.router.navigate(['student', 'information', 'list']);
      this.snackBar.showSnackbar(message);
      this.loaderService.toggleLoader(false);
    }
  }

  previewDocument() {
    var files = this.document.nativeElement.files;
    if (files && files[0]) {
      for (var i = 0; i < files.length; i++) {
        var doc: AddStudentDocumentMappingAc = new AddStudentDocumentMappingAc();
        doc.File = files[i].name;
        doc.Name = files[i].name;
        doc.FileData = files[i];
        doc.FileType = this.fileTypes[1];
        this.documents.push(doc);
      }
    }
  }

  removeDocument(index: number) {
    this.documents.splice(index, 1);
  }

  downloadFile(url: string) {
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

  convertDateToUtc(dateString: any) {
    if (dateString) {
      var date = new Date(dateString);
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    } else {
      return dateString
    }
  }
}
