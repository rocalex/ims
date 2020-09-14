import { Component, OnInit } from '@angular/core';
import { TransportManagementMaintenanceService } from '../transport-management-maintenance.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { AddVehicleMaintenanceManagementAc, VehicleMaintenanceManagementResponse, VehicleMaintenanceManagementResponseType } from '../transport-management-maintenance.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-maintenance-add.html'
})
export class AddTransportManagementMaintenanceComponent implements OnInit {
  currentDate: Date = new Date();
  initialData: any = {};
  addMaintenance: AddVehicleMaintenanceManagementAc = new AddVehicleMaintenanceManagementAc();
  error: VehicleMaintenanceManagementResponse = new VehicleMaintenanceManagementResponse();
  constructor(private transportManagementMaintenanceService: TransportManagementMaintenanceService,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.transportManagementMaintenanceService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addMaintenanceData() {
    this.loaderService.toggleLoader(true);
    this.addMaintenance.MaintenanceDate = this.convertDateToUtc(this.addMaintenance.MaintenanceDate);
    this.addMaintenance.NextMaintenanceDate = this.convertDateToUtc(this.addMaintenance.NextMaintenanceDate);
    this.transportManagementMaintenanceService.addMaintenance(this.addMaintenance).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'maintenance', 'list']);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = VehicleMaintenanceManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = VehicleMaintenanceManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new VehicleMaintenanceManagementResponse();
    }
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
