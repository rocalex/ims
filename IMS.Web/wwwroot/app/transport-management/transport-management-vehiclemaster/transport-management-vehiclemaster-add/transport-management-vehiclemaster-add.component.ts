import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleMasterService } from '../transport-management-vehiclemaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { VehicleMasterManagementResponse, AddVehicleMasterManagementAc, VehicleMasterManagementResponseType, AddVehicleDocumentMappingAc } from '../transport-management-vehiclemaster.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehiclemaster-add.html'
})
export class AddTransportManagementVehicleMasterComponent implements OnInit {
  currentDate: Date = new Date();
  addVehicle: AddVehicleMasterManagementAc = new AddVehicleMasterManagementAc();
  error: VehicleMasterManagementResponse = new VehicleMasterManagementResponse();
  vehicleTypes: string[] = ['Car', 'Bus', 'Mini Bus', 'Van'];
  fuelTypes: string[] = ['Diesel', 'Petrol', 'LPG'];
  @ViewChild('VehiclePhotoInput') VehiclePhotoInput: ElementRef;
  VehiclePhotoURL: any;
  @ViewChild('RegistrationCopyPhotoInput') RegistrationCopyPhotoInput: ElementRef;
  RegistrationCopyPhotoURL: any;
  @ViewChild('InsuranceCopyPhotoInput') InsuranceCopyPhotoInput: ElementRef;
  InsuranceCopyPhotoURL: any;
  selectedTab: number = 0;
  @ViewChild('document') document: ElementRef;
  documents: AddVehicleDocumentMappingAc[] = [];
  fileTypes: string[] = ['Image', 'File'];
  constructor(private vehicleMasterService: VehicleMasterService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
  }

  addVehicleMaster() {
    this.loaderService.toggleLoader(true);
    this.vehicleMasterService.addVehicleMaster(this.addVehicle).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.addOrUpdateStaffDocument(response.data.id, response.message);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = VehicleMasterManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = VehicleMasterManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new VehicleMasterManagementResponse();
    }
  }

  preview(files: any[], index: number) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if (index === 0) {
        this.VehiclePhotoURL = reader.result;
      } else if (index === 1) {
        this.RegistrationCopyPhotoURL = reader.result;
      } else {
        this.InsuranceCopyPhotoURL = reader.result;
      }
    }
  }

  addImage(id: number, message: string) {
    this.loaderService.toggleLoader(true);
    const formData = new FormData();
    var vehicleFiles = this.VehiclePhotoInput.nativeElement.files;
    if (vehicleFiles.length !== 0) {
      for (const file of vehicleFiles) {
        formData.append('VehiclePhoto', file);
      }
    }
    var registrationCopyPhotoFiles = this.RegistrationCopyPhotoInput.nativeElement.files;
    if (registrationCopyPhotoFiles.length !== 0) {
      for (const file of registrationCopyPhotoFiles) {
        formData.append('RegistrationCopyPhoto', file);
      }
    }
    var insuranceCopyPhotoFiles = this.InsuranceCopyPhotoInput.nativeElement.files;
    if (insuranceCopyPhotoFiles.length !== 0) {
      for (const file of insuranceCopyPhotoFiles) {
        formData.append('InsuranceCopyPhoto', file);
      }
    }
    this.vehicleMasterService.addImages(id, formData).then(res => {
      this.snackBar.showSnackbar(message);
      this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
      this.loaderService.toggleLoader(false);
    })
  }

  selectTab(tab: number) {
    this.selectedTab = tab;
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
      this.vehicleMasterService.addOrUpdateVehicleDocument(staffId, formData).then(res => {
        this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
        this.snackBar.showSnackbar(message);
        this.loaderService.toggleLoader(false);
      });
    } else {
      this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
      this.snackBar.showSnackbar(message);
      this.loaderService.toggleLoader(false);
    }
  }

  previewDocument() {
    var files = this.document.nativeElement.files;
    if (files && files[0]) {
      for (var i = 0; i < files.length; i++) {
        var doc: AddVehicleDocumentMappingAc = new AddVehicleDocumentMappingAc();
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
}
