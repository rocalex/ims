import { Component, OnInit } from '@angular/core';
import { TransportManagementAccidentService } from '../transport-management-accident.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateVehicleAccidentManagementAc, VehicleAccidentManagementResponse, VehicleAccidentManagementResponseType } from '../transport-management-accident.model';

@Component({
    moduleId: module.id,
    templateUrl: 'transport-management-accident-edit-detail.html'
})
export class EditAndDetailTransportManagementAccidentComponent implements OnInit {
    currentDate: Date = new Date();
    initialData: any = {};
    addAccident: UpdateVehicleAccidentManagementAc = new UpdateVehicleAccidentManagementAc();
    error: VehicleAccidentManagementResponse = new VehicleAccidentManagementResponse();
    constructor(private transportManagementAccidentService: TransportManagementAccidentService, private activeRoute: ActivatedRoute,
        private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addAccident.Id = +res.id);
        this.getInitialData();
        this.getAccident();
    }

    getAccident() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.getAccident(this.addAccident.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'accident', 'list']);
            } else {
                this.addAccident.Code = response.code;
                this.addAccident.EstimateCost = response.estimateCost;
                this.addAccident.AccidentDate = response.accidentDate;
                this.addAccident.Address = response.address;
                this.addAccident.VehicleId = response.vehicleId;
                this.addAccident.DriverId = response.driverId;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        })
    }

    updateAccident() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.updateAccident(this.addAccident).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'vehiclemaintenance', 'accident', 'list']);
            } else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    hasError(fieldName: string) {
        var id = VehicleAccidentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        } else {
            return false;
        }
    }

    resetError(fieldName: string) {
        var id = VehicleAccidentManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new VehicleAccidentManagementResponse();
        }
    }

    isDriverAllowed(id: number) {
        if (this.initialData.vehicleDriverMappings) {
            if (this.addAccident.VehicleId) {
                var driver = this.initialData.vehicleDriverMappings.find(x => x.driverId === id && x.vehicleId === this.addAccident.VehicleId);
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
        if (this.addAccident.DriverId) {
            this.addAccident.DriverId = undefined;
        }
    }
}
