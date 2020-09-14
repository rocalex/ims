import { Component, OnInit } from '@angular/core';
import { VehicleDriverMappingService } from '../transport-management-vehicledrivermapping.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-vehicledrivermapping-edit-detail.html'
})
export class EditAndDetailTransportManagementVehicleDriverMappingComponent implements OnInit {
  vehicleId: number;
  selectedDrivers: number[] = [];
  drivers: any[] = [];
  vehicles: any[] = [];
  primaryDriver: number;
  otherDrivers: any[] = [];
  primaryDrivers: any[] = [];
  constructor(private vehicleDriverMappingService: VehicleDriverMappingService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.vehicleId = +res.id);
    this.getDriverMasters();
    this.getVehicleMasters();
  }

  getDriverByVehicleId() {
    this.loaderService.toggleLoader(true);
    this.vehicleDriverMappingService.getDriverByVehicleId(this.vehicleId).then(res => {
      var response = res.json();
      var list = response.filter(x => x.isPrimary === false);
      this.selectedDrivers = list.map(x => x.driverId);
      var primary = response.find(x => x.isPrimary === true);
      if (primary) {
        this.primaryDriver = primary.driverId;
      }
      this.filterDriver();
      this.loaderService.toggleLoader(false);
    });
  }

  getDriverMasters() {
    this.loaderService.toggleLoader(true);
    this.vehicleDriverMappingService.getDriverMasters().then(res => {
      this.drivers = res.json();
      this.getDriverByVehicleId();
      this.loaderService.toggleLoader(false);
    });
  }

  getVehicleMasters() {
    this.loaderService.toggleLoader(true);
    this.vehicleDriverMappingService.getVehicleMasters().then(res => {
      this.vehicles = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateVehicleDriverMapping() {
    this.loaderService.toggleLoader(true);
    var list: any[] = [{ DriverId: this.primaryDriver, IsPrimary: true }];
    for (var i = 0; i < this.selectedDrivers.length; i++) {
      list.push({ DriverId: this.selectedDrivers[i], IsPrimary: false });
    }
    var data = { VehicleId: this.vehicleId, Drivers: list };
    this.vehicleDriverMappingService.addOrUpdateVehicleDriverMapping(data).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['transportmanagement', 'vehicledrivermapping', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }

  filterDriver() {
    this.otherDrivers = JSON.parse(JSON.stringify(this.drivers));
    this.primaryDrivers = JSON.parse(JSON.stringify(this.drivers));
    if (this.primaryDriver) {
      var driverIndex = this.otherDrivers.findIndex(x => x.id === this.primaryDriver);
      this.otherDrivers.splice(driverIndex, 1);
    }
    if (this.selectedDrivers.length) {
      for (var i = 0; i < this.selectedDrivers.length; i++) {
        var index = this.primaryDrivers.findIndex(x => x.id === this.selectedDrivers[i]);
        this.primaryDrivers.splice(index, 1);
      }
    }
  }
}
