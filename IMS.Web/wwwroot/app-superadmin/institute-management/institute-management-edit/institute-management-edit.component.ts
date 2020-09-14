import { Component, OnInit } from '@angular/core';
import { InstituteManagementService } from '../institute-management.service';
import { InstituteResponse, UpdateInstitute } from '../institute-management.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../shared/snackbar-service';
import { LoaderService } from '../../../shared/loader-service';
import { MouseEvent, MapsAPILoader } from '@agm/core';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-edit.html'
})
export class InstituteManagementEditComponent implements OnInit {
  institute: UpdateInstitute = new UpdateInstitute();
  error: InstituteResponse = new InstituteResponse();
  zoom: number = 8;
  lat: number;
  lng: number;
  markers: any = {
    label: 'A',
    draggable: true
  };
  constructor(private instituteManagementService: InstituteManagementService, private snackBar: SnackbarService,
    private router: Router, private loaderService: LoaderService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.institute.Id = +res.id);
    this.getInstituteDetail();
  }

  getInstituteDetail() {
    this.loaderService.toggleLoader(true);
    this.instituteManagementService.getInstituteDetail(this.institute.Id).then(res => {
      var response = res.json();
      if (response) {
        this.institute.Address = response.address;
        this.institute.Code = response.code;
        this.institute.InstituteName = response.name;
        this.institute.Latitude = response.latitude;
        this.institute.Longitude = response.longitude;
        this.institute.Location = response.location;
        this.markers.lat = this.institute.Latitude;
        this.markers.lng = this.institute.Longitude;
        this.lat = +this.institute.Latitude;
        this.lng = +this.institute.Longitude;
      } else {
        this.router.navigate(['institute', 'list']);
        this.snackBar.showSnackbar('Institute not found');
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateInstitute() {
    this.loaderService.toggleLoader(true);
    this.institute.Latitude = this.markers.lat;
    this.institute.Longitude = this.markers.lng;
    this.instituteManagementService.updateInstitute(this.institute).then(res => {
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
