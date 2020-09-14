import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StageService } from '../transport-management-stage.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StageManagementResponseType, StageManagementResponse, AddStageManagementAc } from '../transport-management-stage.model';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-stage-add.html'
})
export class AddTransportManagementStageComponent implements OnInit {
  addStage: AddStageManagementAc = new AddStageManagementAc();
  error: StageManagementResponse = new StageManagementResponse();
  initialData: any = {};
  zoom: number = 8;
  lat: number;
  lng: number;
  markers: any = {
    label: 'A',
    draggable: true
  };
  constructor(private stageService: StageService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.stageService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addStageData() {
    this.loaderService.toggleLoader(true);
    this.addStage.Latitude = this.markers.lat;
    this.addStage.Longitude = this.markers.lng;
    this.stageService.addStage(this.addStage).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'stage', 'list']);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = StageManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = StageManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new StageManagementResponse();
    }
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
