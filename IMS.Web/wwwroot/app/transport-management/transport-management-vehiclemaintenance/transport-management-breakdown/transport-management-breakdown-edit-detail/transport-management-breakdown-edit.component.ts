import { Component, OnInit } from '@angular/core';
import { TransportManagementBreakDownService } from '../transport-management-breakdown.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateVehicleBreakDownManagementAc, VehicleBreakDownManagementResponse, VehicleBreakDownManagementResponseType } from '../transport-management-breakdown.model';

@Component({
    moduleId: module.id,
    templateUrl: 'transport-management-breakdown-edit-detail.html'
})
export class EditAndDetailTransportManagementBreakDownComponent implements OnInit {
    currentDate: Date = new Date();
    initialData: any = {};
    addBreakDown: UpdateVehicleBreakDownManagementAc = new UpdateVehicleBreakDownManagementAc();
    error: VehicleBreakDownManagementResponse = new VehicleBreakDownManagementResponse();
    constructor(private transportManagementBreakDownService: TransportManagementBreakDownService, private activeRoute: ActivatedRoute,
        private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addBreakDown.Id = +res.id);
        this.getInitialData();
        this.getBreakDown();
    }

    getBreakDown() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.getBreakDown(this.addBreakDown.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'breakdown', 'list']);
            } else {
                this.addBreakDown.Code = response.code;
                this.addBreakDown.BreakDownDuration = response.breakDownDuration;
                this.addBreakDown.BreakDownDate = response.breakDownDate;
                this.addBreakDown.Address = response.address;
                this.addBreakDown.VehicleId = response.vehicleId;
                this.addBreakDown.DriverId = response.driverId;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        })
    }

    updateBreakDown() {
        this.loaderService.toggleLoader(true);
        this.transportManagementBreakDownService.updateBreakDown(this.addBreakDown).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'breakdown', 'list']);
            } else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    hasError(fieldName: string) {
        var id = VehicleBreakDownManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        } else {
            return false;
        }
    }

    resetError(fieldName: string) {
        var id = VehicleBreakDownManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new VehicleBreakDownManagementResponse();
        }
    }

    isDriverAllowed(id: number) {
        if (this.initialData.vehicleDriverMappings) {
            if (this.addBreakDown.VehicleId) {
                var driver = this.initialData.vehicleDriverMappings.find(x => x.driverId === id && x.vehicleId === this.addBreakDown.VehicleId);
                if (driver) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    resetDriver() {
        if (this.addBreakDown.DriverId) {
            this.addBreakDown.DriverId = undefined;
        }
    }
}
