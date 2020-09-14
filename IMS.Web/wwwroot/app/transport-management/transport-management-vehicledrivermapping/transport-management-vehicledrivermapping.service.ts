import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class VehicleDriverMappingService {
  VehicleDriverMappingManagementUrl = 'api/vehicledrivermapping';
  VehicleManagementUrl = 'api/vehiclemastermanagement';
  DriverManagementUrl = 'api/drivermastermanagement';
  constructor(private http: HttpService) { }

  addOrUpdateVehicleDriverMapping(vehicleDriver: any) {
    return this.http.post(this.VehicleDriverMappingManagementUrl, vehicleDriver);
  }

  getDriverByVehicleId(vehicleId: number) {
    return this.http.get(this.VehicleDriverMappingManagementUrl + '/' + vehicleId);
  }

  getVehicleMasters() {
    return this.http.get(this.VehicleManagementUrl);
  }

  getDriverMasters() {
    return this.http.get(this.DriverManagementUrl);
  }
}
