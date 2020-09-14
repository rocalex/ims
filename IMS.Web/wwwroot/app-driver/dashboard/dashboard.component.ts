import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

import { LoaderService } from '../../shared/loader-service';
import { DashboardService } from './dashboard.service';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.html'
})
export class DriverDashboardComponent implements OnInit {

    vehicleDriverMappingsList: any[] = [];
    vehiclesList: any[] = [];
    primaryVehicle: any = {};
    driverInfo: any = {};
    vehicleAccidentMaintenanceDetailsList: any[] = [];

    zoom: number = 8;
    lat: number;
    lng: number;
    markers: any = {
        label: 'A',
        draggable: true
    };

    constructor(private loaderService: LoaderService,
        private dashboardService: DashboardService) { }

    ngOnInit() {
        this.getDriverDashboardDetails();
    }

    getDriverDashboardDetails() {
        this.loaderService.toggleLoader(true);
        this.dashboardService.getDriverDashboardDetails()
            .then(res => {
                let response = res.json();
                console.log(res.json());

                this.vehicleDriverMappingsList = response.vehiclesList;
                this.vehiclesList = this.vehicleDriverMappingsList.map(x => x.vehicle);
                this.primaryVehicle = this.vehicleDriverMappingsList.filter(x => x.isPrimary).map(x => x.vehicle)[0];
                this.driverInfo = this.vehicleDriverMappingsList[0].driver;

                this.vehicleAccidentMaintenanceDetailsList = response.vehicleAccidentMaintenanceDetailsList;

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    mapClicked($event: MouseEvent) {
        this.markers.lat = $event.coords.lat;
        this.markers.lng = $event.coords.lng;
    }
}
