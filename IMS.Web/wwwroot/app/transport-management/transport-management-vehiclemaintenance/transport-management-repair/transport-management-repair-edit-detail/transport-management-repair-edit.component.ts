import { Component, OnInit } from '@angular/core';
import { TransportManagementRepairService } from '../transport-management-repair.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateVehicleRepairManagementAc, VehicleRepairManagementResponse, VehicleRepairManagementResponseType } from '../transport-management-repair.model';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-repair-edit-detail.html'
})
export class EditAndDetailTransportManagementRepairComponent implements OnInit {
  initialData: any = {};
  addRepair: UpdateVehicleRepairManagementAc = new UpdateVehicleRepairManagementAc();
  error: VehicleRepairManagementResponse = new VehicleRepairManagementResponse();
  constructor(private transportManagementRepairService: TransportManagementRepairService, private activeRoute: ActivatedRoute,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addRepair.Id = +res.id);
    this.getInitialData();
    this.getRepair();
  }

  getRepair() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.getRepair(this.addRepair.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'repair', 'list']);
      } else {
        this.addRepair.Code = response.code;
        this.addRepair.RepairCost = response.repairCost;
        this.addRepair.RepairDate = response.repairDate;
        this.addRepair.Remarks = response.remarks;
        this.addRepair.VehicleId = response.vehicleId;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  updateRepair() {
    this.loaderService.toggleLoader(true);
    this.transportManagementRepairService.updateRepair(this.addRepair).then(res => {
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
