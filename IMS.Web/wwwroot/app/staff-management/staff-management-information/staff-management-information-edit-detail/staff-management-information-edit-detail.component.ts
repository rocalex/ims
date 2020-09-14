import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffManagementResponseType, StaffManagementResponse, AddStaffExperienceMappingAc, MaritalStatusEnum, EditStaffManagementAc, AddStaffDocumentMappingAc } from '../staff-management-information.model';
import { StaffManagementService } from '../staff-management-information.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-information-edit-detail.html'
})
export class EditAndDetailStaffManagementInformationComponent implements OnInit {
  addStaff: EditStaffManagementAc = new EditStaffManagementAc();
  error: StaffManagementResponse = new StaffManagementResponse();
  initialData: any = {};
  selectedTab: number = 0;
  experienceList: AddStaffExperienceMappingAc[] = [];
  experienceId: number = 0;
  errorMessageForExperience: string = '';
  tempExperience: AddStaffExperienceMappingAc = new AddStaffExperienceMappingAc();
  todayDate: Date = new Date();
  @ViewChild('fileInput') fileInput: ElementRef;
  imgURL: any;
  @ViewChild('gallery') gallery: ElementRef;
  gallerys: any[] = [];
  imageId: number = 1;
  imageFiles: any[] = [];
  @ViewChild('document') document: ElementRef;
  documents: AddStaffDocumentMappingAc[] = [];
  fileTypes: string[] = ['Image', 'File'];
  currentDate: Date = new Date();
  constructor(private staffManagementService: StaffManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
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
      } else {
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

        this.addStaff.DepartmentsIdList = new Array<number>();
        for (let i = 0; i < response.staffDepartments.length; i++) {
          this.addStaff.DepartmentsIdList.push(response.staffDepartments[i].departmentId);
        }

        for (var i = 0; i < response.staffExperiences.length; i++) {
          var experience = new AddStaffExperienceMappingAc();
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
    })
  }

  hasError(fieldName: string) {
    var id = StaffManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = StaffManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new StaffManagementResponse();
    }
  }

  getInitialDataForAddOrEditStaff() {
    this.loaderService.toggleLoader(true);
    this.staffManagementService.getInitialDataForAddOrEditStaff().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  selectTab(tab: number) {
    this.selectedTab = tab;
  }

  isSameAsPermanent() {
    if (this.addStaff.IsPresentAddressIsSameAsPermanent) {
      if (this.addStaff.PermanentAddress) {
        this.addStaff.PresentAddress = JSON.parse(JSON.stringify(this.addStaff.PermanentAddress));
      } else {
        this.addStaff.PresentAddress = "dummy";
      }
      if (this.addStaff.PermanentZipcode) {
        this.addStaff.PresentZipcode = JSON.parse(JSON.stringify(this.addStaff.PermanentZipcode));
      } else {
        this.addStaff.PresentZipcode = '';
      }
      if (this.addStaff.PermanentCityId) {
        this.addStaff.PresentCityId = JSON.parse(JSON.stringify(this.addStaff.PermanentCityId));
      }
    } else {
      this.addStaff.PresentAddress = '';
      this.addStaff.PresentZipcode = '';
      this.addStaff.PresentCityId = undefined;
    }
  }

  addExperienceCard() {
    var anyEdit = this.experienceList.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForExperience = '';
      const experience: AddStaffExperienceMappingAc = new AddStaffExperienceMappingAc();
      experience.Id = this.experienceId;
      experience.IsEdit = true;
      this.experienceId++;
      this.experienceList.push(experience);
    } else {
      this.errorMessageForExperience = 'Another card is on process';
    }
  }

  saveExperience(experience: AddStaffExperienceMappingAc) {
    experience.IsEdit = false
  }

  editExperience(experience: AddStaffExperienceMappingAc) {
    var anyEdit = this.experienceList.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForExperience = '';
      this.tempExperience = JSON.parse(JSON.stringify(experience));
      experience.IsEdit = true;
    } else {
      this.errorMessageForExperience = 'Another card is on process';
    }
  }

  unEditExperience(experience: AddStaffExperienceMappingAc) {
    if (this.tempExperience.InstituteName) {
      var index = this.experienceList.findIndex(x => x.Id === experience.Id);
      this.experienceList[index].InstituteName = JSON.parse(JSON.stringify(this.tempExperience.InstituteName));
      this.experienceList[index].IsEdit = false;
      this.tempExperience = new AddStaffExperienceMappingAc();
    } else {
      experience.IsEdit = false;
      if (!experience.InstituteName || !experience.StartDate || !experience.EndDate) {
        this.removeExperience(experience);
      }
    }
  }

  removeExperience(experience: AddStaffExperienceMappingAc) {
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
      } else {
        if (response.errorType <= 11) {
          this.selectedTab = 0;
        } else if (response.errorType === 15) {
          this.selectedTab = 2;
        } else {
          this.selectedTab = 1;
        }
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    });
  }

  checkStartDateEndDate(experience: AddStaffExperienceMappingAc) {
    if (experience.EndDate) {
      if (experience.EndDate < experience.StartDate) {
        experience.EndDate = JSON.parse(JSON.stringify(experience.StartDate));
      }
    }
  }

  addOrUpdateStaffImage(staffId: number, message: string) {
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
    } else {
      this.addOrUpdateStaffGallery(staffId, message);
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

  addOrUpdateStaffGallery(staffId: number, message: string) {
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
    } else {
      this.updateDocumentData(staffId, message);
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
      this.addStaff.GalleryImageToDelete.push(viewImage.previousId);
    }
  }

  updateDocumentData(staffId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddStaffDocumentMappingAc[] = [];
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

  addOrUpdateStaffDocument(staffId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddStaffDocumentMappingAc[] = [];
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
    } else {
      this.router.navigate(['staff', 'master', 'list']);
      this.snackBar.showSnackbar(message);
      this.loaderService.toggleLoader(false);
    }
  }

  previewDocument() {
    var files = this.document.nativeElement.files;
    if (files && files[0]) {
      for (var i = 0; i < files.length; i++) {
        var doc: AddStaffDocumentMappingAc = new AddStaffDocumentMappingAc();
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
    if (this.addStaff.PassportIssuedDate) {
      if (this.addStaff.PassportIssuedDate > this.addStaff.PassportExpireDate) {
        this.addStaff.PassportExpireDate = this.addStaff.PassportIssuedDate;
      }
    }
  }
}
