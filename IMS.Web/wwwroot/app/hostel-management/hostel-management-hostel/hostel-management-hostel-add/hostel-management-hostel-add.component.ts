import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { HostelModel, StudentModel, PositionModel } from '../hostel-management-hostel.model';
import { HostelManagementHostelService } from '../hostel-management-hostel.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { setSeconds } from 'date-fns';

@Component({
  moduleId: module.id,
  templateUrl: 'hostel-management-hostel-add.html'
})
export class HostelManagementAddHostelComponent implements OnInit {
  currentDate: Date = new Date();
  zoom: number = 8;
  lat: number;
  lng: number;
  markers: any = {
    label: 'A',
    draggable: true
  };
  
  countryList: PositionModel[] = [];
  stateList: PositionModel[] = [];
  cityList: PositionModel[] = [];
  memberList: StudentModel[] = [];
  hostelTypes: any[] = [
    {
      label: 'female',
      value: 0
    },
    {
      label: 'male',
      value: 1
    }];
  addHostel: HostelModel = new HostelModel();
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private snackBar: SnackbarService,
    private service: HostelManagementHostelService
    ) {
  }

  ngOnInit() {
    this.getAdditional();
  }

  getAdditional() {
    this.service.getAdditional().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.countryList = response.country;
        this.stateList = response.state;
        this.cityList = response.city;
        this.memberList = response.students;
      } else {
        this.snackBar.showSnackbar("There is problem on fetching initial data!");
      }
    }).catch(error => {
      this.snackBar.showSnackbar(error.message);
    });
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

  add() {
    this.loaderService.toggleLoader(true);
    this.service.addNewHostel(this.addHostel).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
        this.router.navigate(['hostel', 'list']);
      } else {
        this.snackBar.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
      }
    }).catch(err => {
      this.snackBar.showSnackbar(err.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
