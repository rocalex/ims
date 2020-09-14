import { Component, OnInit } from '@angular/core';
import { InstituteManagementService } from '../institute-management.service';
import { AddInstitute, InstituteResponseType, InstituteResponse, EmailBccAndCc } from '../institute-management.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/snackbar-service';
import { LoaderService } from '../../../shared/loader-service';
import { MouseEvent, MapsAPILoader } from '@agm/core';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-add.html'
})
export class InstituteManagementAddComponent implements OnInit {
  institute: AddInstitute = new AddInstitute();
  error: InstituteResponse = new InstituteResponse();
  listOfBcc: EmailBccAndCc[] = [];
  tempBcc: EmailBccAndCc = new EmailBccAndCc();
  errorMessageForBcc: string = '';
  bccId: number = 0;
  listOfcc: EmailBccAndCc[] = [];
  tempCc: EmailBccAndCc = new EmailBccAndCc();
  errorMessageForCc: string = '';
  ccId: number = 0;
  users: any[] = [];
  mappedUser: string[] = [];
  zoom: number = 8;
  lat: number;
  lng: number;
  markers: any = {
    label: 'A',
    draggable: true
  };
  constructor(private instituteManagementService: InstituteManagementService, private snackBar: SnackbarService,
    private router: Router, private loaderService: LoaderService) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit() {
    this.getAllUser();
  }

  addInstitute() {
    this.loaderService.toggleLoader(true);
    this.institute.Bcc = this.listOfBcc.map(x => x.Email);
    this.institute.Cc = this.listOfcc.map(x => x.Email);
    this.institute.Latitude = this.markers.lat;
    this.institute.Longitude = this.markers.lng;
    this.instituteManagementService.addInstitute(this.institute).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['institute', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
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
    var id = InstituteResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = InstituteResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new InstituteResponse();
    }
  }

  addBccCard() {
    var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForBcc = '';
      const Bcc: EmailBccAndCc = new EmailBccAndCc();
      Bcc.Id = this.bccId;
      Bcc.IsEdit = true;
      this.bccId++;
      this.listOfBcc.push(Bcc);
    } else {
      this.errorMessageForBcc = 'Another card is on process';
    }
  }

  saveBcc(Bcc: EmailBccAndCc) {
    Bcc.IsEdit = false
  }

  editBcc(Bcc: EmailBccAndCc) {
    var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForBcc = '';
      this.tempBcc = JSON.parse(JSON.stringify(Bcc));
      Bcc.IsEdit = true;
    } else {
      this.errorMessageForBcc = 'Another card is on process';
    }
  }

  unEditBcc(Bcc: EmailBccAndCc) {
    if (this.tempBcc.Email) {
      var index = this.listOfBcc.findIndex(x => x.Id === Bcc.Id);
      this.listOfBcc[index].Email = JSON.parse(JSON.stringify(this.tempBcc.Email));
      this.listOfBcc[index].IsEdit = false;
      this.tempBcc = new EmailBccAndCc();
    } else {
      Bcc.IsEdit = false;
      if (!Bcc.Email) {
        this.removeBcc(Bcc);
      }
    }
  }

  removeBcc(Bcc: EmailBccAndCc) {
    var index = this.listOfBcc.findIndex(x => x.Id === Bcc.Id);
    this.listOfBcc.splice(index, 1);
  }

  isAllowedToSaveBcc() {
    var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
    return (anyEdit.length === 0);
  }

  addCcCard() {
    var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForCc = '';
      const cc: EmailBccAndCc = new EmailBccAndCc();
      cc.Id = this.ccId;
      cc.IsEdit = true;
      this.ccId++;
      this.listOfcc.push(cc);
    } else {
      this.errorMessageForCc = 'Another card is on process';
    }
  }

  saveCc(cc: EmailBccAndCc) {
    cc.IsEdit = false
  }

  editCc(cc: EmailBccAndCc) {
    var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
    if (anyEdit.length === 0) {
      this.errorMessageForCc = '';
      this.tempCc = JSON.parse(JSON.stringify(cc));
      cc.IsEdit = true;
    } else {
      this.errorMessageForCc = 'Another card is on process';
    }
  }

  unEditCc(cc: EmailBccAndCc) {
    if (this.tempCc.Email) {
      var index = this.listOfcc.findIndex(x => x.Id === cc.Id);
      this.listOfcc[index].Email = JSON.parse(JSON.stringify(this.tempCc.Email));
      this.listOfcc[index].IsEdit = false;
      this.tempCc = new EmailBccAndCc();
    } else {
      cc.IsEdit = false;
      if (!cc.Email) {
        this.removeCc(cc);
      }
    }
  }

  removeCc(Bcc: EmailBccAndCc) {
    var index = this.listOfcc.findIndex(x => x.Id === Bcc.Id);
    this.listOfcc.splice(index, 1);
  }

  isAllowedToSaveCc() {
    var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
    return (anyEdit.length === 0);
  }

  getAllUser() {
    this.loaderService.toggleLoader(true);
    this.instituteManagementService.getAllUser().then(res => {
      this.users = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  mapClicked($event: MouseEvent) {
    this.markers.lat = $event.coords.lat;
    this.markers.lng = $event.coords.lng;
  }

  handleAddressChange(address: any) {
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
    this.markers.lat = address.geometry.location.lat();
    this.markers.lng = address.geometry.location.lng();
  }
}
