import { Component, OnInit } from '@angular/core';
import { TransportManagementRepairService } from '../transport-management-repair.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { AddVehicleRepairManagementAc, VehicleRepairManagementResponse, VehicleRepairManagementResponseType } from '../transport-management-repair.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-repair-add.html'
})
export class AddTransportManagementRepairComponent implements OnInit {
  initialData: any = {};
  addRepair: AddVehicleRepairManagementAc = new AddVehicleRepairManagementAc();
  error: VehicleRepairManagementResponse = new VehicleRepairManagementResponse();
  constructor(private transportManagementRepairService: TransportManagementRepairService,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addRepairData() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.addRepair(this.addRepair).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'repair', 'list']);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = VehicleRepairManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = VehicleRepairManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new VehicleRepairManagementResponse();
    }
  }
}
