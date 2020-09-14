import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class DriverMasterService {
  FeeRefundManagementUrl = 'api/drivermastermanagement';
  constructor(private http: HttpService) { }

  addDriverMaster(driverMaster: any) {
    return this.http.post(this.FeeRefundManagementUrl, driverMaster);
  }

  getDriverMasters() {
    return this.http.get(this.FeeRefundManagementUrl);
  }

  getDriverMaster(driverId: number) {
    return this.http.get(this.FeeRefundManagementUrl + '/' + driverId);
  }

  updateDriverMaster(driverMaster: any) {
    return this.http.put(this.FeeRefundManagementUrl, driverMaster);
  }

  addImages(driverId: number, formData: FormData) {
    return this.http.postForFormData(this.FeeRefundManagementUrl + '/image/' + driverId, formData);
  }
}
