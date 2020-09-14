import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { HostelModel, StudentModel, PositionModel } from '../hostel-management-hostel.model';
import { HostelManagementHostelService } from '../hostel-management-hostel.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { setSeconds } from 'date-fns';

@Component({
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
    hostelId: number = 0;
  constructor(
    private activateRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private snackBar: SnackbarService,
    private service: HostelManagementHostelService
  ) { 
    this.activateRoute.params.subscribe(param => this.hostelId = param.id);
  }

  ngOnInit() {
    this.getHostelInfo();
  }

  getHostelInfo() {
    this.loaderService.toggleLoader(true);
    this.service.getHostelById(this.hostelId).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'list']);
      }
      this.addHostel = response;
      this.service.getAdditional().then(res1 => {
        let response1 = res1.json();
        if (response1.hasError !== null && response1.hasError !== undefined && response1.hasError) {
          this.snackBar.showSnackbar(response.message);
          this.router.navigate(['hostel', 'list']);
        }
        this.memberList = response1.students;
        this.countryList = response1.country;
        this.stateList = response1.state;
        this.cityList = response1.city;
        this.loaderService.toggleLoader(false);
      });
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
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
    this.service.updateHostel(this.addHostel).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.router.navigate(['hostel', 'list']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.snackBar.showSnackbar(err.message);
      this.loaderService.toggleLoader(false);
    })
  }
}
