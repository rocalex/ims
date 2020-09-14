import { Component, OnInit } from '@angular/core';
import { StageService } from '../transport-management-stage.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StageManagementResponse, StageManagementResponseType, UpdateStageManagementAc } from '../transport-management-stage.model';
import { MouseEvent } from '@agm/core';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-stage-edit-detail.html'
})
export class EditAndDetailTransportManagementStageComponent implements OnInit {
  addStage: UpdateStageManagementAc = new UpdateStageManagementAc();
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
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addStage.Id = res.id);
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
    this.getStage();
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.stageService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  getStage() {
    this.loaderService.toggleLoader(true);
    this.stageService.getStage(this.addStage.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'stage', 'list']);
      } else {
        this.addStage.Address = response.address;
        this.addStage.Code = response.code;
        this.addStage.Latitude = response.latitude;
        this.addStage.Longitude = response.longitude;
        this.addStage.Name = response.name;
        this.addStage.SlabId = response.slabId;
        this.addStage.Term1 = response.term1;
        this.addStage.Term2 = response.term2;
        this.addStage.Term3 = response.term3;
        if (response.latitude) {
          this.markers.lat = response.latitude;
          this.lat = undefined;
          setTimeout(() => {
            this.lat = +response.latitude;
          }, 0);
        }
        if (response.longitude) {
          this.markers.lng = response.longitude;
          this.lng = undefined;
          setTimeout(() => {
            this.lng = +response.longitude;
          }, 0);
        }
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateStage() {
    this.loaderService.toggleLoader(true);
    this.addStage.Latitude = this.markers.lat;
    this.addStage.Longitude = this.markers.lng;
    this.stageService.updateStage(this.addStage).then(res => {
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
