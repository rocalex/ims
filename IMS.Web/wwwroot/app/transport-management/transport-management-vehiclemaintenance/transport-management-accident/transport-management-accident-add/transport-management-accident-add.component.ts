import { Component, OnInit } from '@angular/core';
import { TransportManagementAccidentService } from '../transport-management-accident.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { AddVehicleAccidentManagementAc, VehicleAccidentManagementResponse, VehicleAccidentManagementResponseType } from '../transport-management-accident.model';

@Component({
    moduleId: module.id,
    templateUrl: 'transport-management-accident-add.html'
})
export class AddTransportManagementAccidentComponent implements OnInit {
    currentDate: Date = new Date();
    initialData: any = {};
    addAccident: AddVehicleAccidentManagementAc = new AddVehicleAccidentManagementAc();
    error: VehicleAccidentManagementResponse = new VehicleAccidentManagementResponse();
    constructor(private transportManagementAccidentService: TransportManagementAccidentService,
        private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
    }

    ngOnInit() {
        this.getInitialData();
    }

    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        })
    }

    addAccidentData() {
        this.loaderService.toggleLoader(true);
        this.transportManagementAccidentService.addAccident(this.addAccident).then(res => {
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
