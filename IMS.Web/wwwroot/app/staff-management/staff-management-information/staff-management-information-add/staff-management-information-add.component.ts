import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffManagementResponseType, StaffManagementResponse, AddStaffExperienceMappingAc, MaritalStatusEnum, AddStaffManagementAc, AddStaffDocumentMappingAc } from '../staff-management-information.model';
import { StaffManagementService } from '../staff-management-information.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-information-add.html'
})
export class AddStaffManagementInformationComponent implements OnInit {
  addStaff: AddStaffManagementAc = new AddStaffManagementAc();
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
  employeeIdEditable: boolean = false;
  @ViewChild('document') document: ElementRef;
  documents: AddStaffDocumentMappingAc[] = [];
  fileTypes: string[] = ['Image', 'File'];
  currentDate: Date = new Date();
  constructor(private staffManagementService: StaffManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getAutoSequenceNumberByTypeAndInstituteId();
    this.getInitialDataForAddOrEditStaff();
  }

  getAutoSequenceNumberByTypeAndInstituteId() {
    this.loaderService.toggleLoader(true);
    this.staffManagementService.getAutoSequenceNumberByTypeAndInstituteId().then(res => {
      var response = res.json();
      if (response.hasValue) {
        this.addStaff.EmployeeId = response.data;
        this.employeeIdEditable = false;
      } else {
        this.employeeIdEditable = true;
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

  addStaffDetail() {
    this.loaderService.toggleLoader(true);
    this.addStaff.AddStaffExperienceMappings = this.experienceList;
    this.staffManagementService.addStaffDetail(this.addStaff).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.addOrUpdateStaffImage(response.staffId, response.message);
      } else {
        if (response.errorType <= 9) {
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
        this.addOrUpdateStaffDocument(staffId, message);
        this.loaderService.toggleLoader(false);
      });
    } else {
      this.addOrUpdateStaffDocument(staffId, message);
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
          this.gallerys.push({ id: this.imageId, image: result });
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
    var index = this.imageFiles.indexOf(image);
    this.imageFiles.splice(index, 1);
    var viewImage = this.gallerys.find(x => x.id === id);
    var viewImageIndex = this.gallerys.indexOf(viewImage);
    this.gallerys.splice(viewImageIndex, 1);
  }

  addOrUpdateStaffDocument(staffId: number, message: string) {
    this.loaderService.toggleLoader(true);
    const files = this.documents.map(x => x.FileData);
    if (files.length !== 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      formData.append('model-document', JSON.stringify(this.documents));
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

  changeIssueDate() {
    if (this.addStaff.PassportIssuedDate) {
      if (this.addStaff.PassportIssuedDate > this.addStaff.PassportExpireDate) {
        this.addStaff.PassportExpireDate = this.addStaff.PassportIssuedDate;
      }
    }
  }
}