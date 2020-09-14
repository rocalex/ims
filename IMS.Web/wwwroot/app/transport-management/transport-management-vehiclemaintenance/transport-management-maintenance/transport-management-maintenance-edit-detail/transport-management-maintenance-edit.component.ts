import { Component, OnInit } from '@angular/core';
import { TransportManagementMaintenanceService } from '../transport-management-maintenance.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateVehicleMaintenanceManagementAc, VehicleMaintenanceManagementResponse, VehicleMaintenanceManagementResponseType } from '../transport-management-maintenance.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-maintenance-edit-detail.html'
})
export class EditAndDetailTransportManagementMaintenanceComponent implements OnInit {
  currentDate: Date = new Date();
  initialData: any = {};
  addMaintenance: UpdateVehicleMaintenanceManagementAc = new UpdateVehicleMaintenanceManagementAc();
  error: VehicleMaintenanceManagementResponse = new VehicleMaintenanceManagementResponse();
  constructor(private transportManagementMaintenanceService: TransportManagementMaintenanceService,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addMaintenance.Id = +res.id);
    this.getInitialData();
    this.getMaintenance();
  }

  getMaintenance() {
    this.loaderService.toggleLoader(true);
    this.transportManagementMaintenanceService.getMaintenance(this.addMaintenance.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'maintenance', 'list']);
      } else {
        this.addMaintenance.ActionTaken = response.actionTaken;
        this.addMaintenance.Code = response.code;
        this.addMaintenance.EstimateCost = response.estimateCost;
        this.addMaintenance.MaintenanceDate = response.maintenanceDate;
        this.addMaintenance.MaintenanceDoneBy = response.maintenanceDoneBy;
        this.addMaintenance.NextMaintenanceDate = response.nextMaintenanceDate;
        this.addMaintenance.Remark = response.remark;
        this.addMaintenance.VehicleId = response.vehicleId;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.transportManagementMaintenanceService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  updateMaintenance() {
    this.loaderService.toggleLoader(true);
    this.addMaintenance.MaintenanceDate = this.convertDateToUtc(this.addMaintenance.MaintenanceDate);
    this.addMaintenance.NextMaintenanceDate = this.convertDateToUtc(this.addMaintenance.NextMaintenanceDate);
    this.transportManagementMaintenanceService.updateMaintenance(this.addMaintenance).then(res => {
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
