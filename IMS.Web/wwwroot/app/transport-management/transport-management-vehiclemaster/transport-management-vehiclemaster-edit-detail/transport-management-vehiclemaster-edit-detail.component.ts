import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleMasterService } from '../transport-management-vehiclemaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { VehicleMasterManagementResponse, VehicleMasterManagementResponseType, UpdateVehicleMasterManagementAc, AddVehicleDocumentMappingAc } from '../transport-management-vehiclemaster.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehiclemaster-edit-detail.html'
})
export class EditAndDetailTransportManagementVehicleMasterComponent implements OnInit {
    currentDate: Date = new Date();
  addVehicle: UpdateVehicleMasterManagementAc = new UpdateVehicleMasterManagementAc();
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
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addVehicle.Id = res.id);
    this.getVehicleMaster();
  }

  getVehicleMaster() {
    this.loaderService.toggleLoader(true);
    this.vehicleMasterService.getVehicleMaster(this.addVehicle.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
      } else {
        this.addVehicle.AverageKMPL = response.averageKMPL;
        this.addVehicle.ChasisNumber = response.chasisNumber;
        this.addVehicle.EngineNumber = response.engineNumber;
        this.addVehicle.ExtraFittings = response.extraFittings;
        this.addVehicle.FitnessExpDate = response.fitnessExpDate;
        this.addVehicle.FuelType = response.fuelTypeDescription;
        this.addVehicle.InsuranceDate = response.insuranceDate;
        this.addVehicle.InsuranceExpDate = response.insuranceExpDate;
        this.addVehicle.InsuranceNumber = response.insuranceNumber;
        this.addVehicle.NextMaintenanceDate = response.nextMaintenanceDate;
        this.addVehicle.PermitValidityDate = response.permitValidityDate;
        this.addVehicle.VehicleCode = response.vehicleCode;
        this.addVehicle.VehicleRegistrationNumber = response.vehicleRegistrationNumber;
        this.addVehicle.VehicleType = response.vehicleTypeDescription;
        for (var i = 0; i < response.vehicleDocumentMappings.length; i++) {
          var vehicleDocumentMapping = response.vehicleDocumentMappings[i];
          this.documents.push({
            ExpiredDate: vehicleDocumentMapping.expiredDate,
            File: vehicleDocumentMapping.name,
            FileType: this.fileTypes[vehicleDocumentMapping.fileType],
            MetaData: vehicleDocumentMapping.metaData,
            Name: vehicleDocumentMapping.name,
            FileData: vehicleDocumentMapping.fileUrl,
            FileUrl: vehicleDocumentMapping.fileUrl
          });
        }
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateVehicleMaster() {
    this.loaderService.toggleLoader(true);
    this.vehicleMasterService.updateVehicleMaster(this.addVehicle).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.updateDocumentData(this.addVehicle.Id, response.message);
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

  updateDocumentData(VehicleId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddVehicleDocumentMappingAc[] = [];
    for (var i = 0; i < this.documents.length; i++) {
      if (typeof this.documents[i].FileData === 'string') {
        documentToSave.push(this.documents[i]);
      }
    }
    this.vehicleMasterService.updateDocumentData(documentToSave, VehicleId).then(res => {
      this.addOrUpdateVehicleDocument(VehicleId, message);
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateVehicleDocument(VehicleId: number, message: string) {
    this.loaderService.toggleLoader(true);
    var documentToSave: AddVehicleDocumentMappingAc[] = [];
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
      this.vehicleMasterService.addOrUpdateVehicleDocument(VehicleId, formData).then(res => {
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

  downloadFile(url: string) {
    if (url) {
      var fileurl = location.origin + '/' + url;
      window.open(fileurl);
    }
  }
}
