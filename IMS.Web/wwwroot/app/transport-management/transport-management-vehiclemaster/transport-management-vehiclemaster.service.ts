import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class VehicleMasterService {
  VehicleManagementUrl = 'api/vehiclemastermanagement';
  constructor(private http: HttpService) { }

  addVehicleMaster(vehicleMaster: any) {
    return this.http.post(this.VehicleManagementUrl, vehicleMaster);
  }

  getVehicleMasters() {
    return this.http.get(this.VehicleManagementUrl);
  }

  getVehicleMaster(vehicleId: number) {
    return this.http.get(this.VehicleManagementUrl + '/' + vehicleId);
  }

  updateVehicleMaster(vehicleMaster: any) {
    return this.http.put(this.VehicleManagementUrl, vehicleMaster);
  }

  addImages(vehicleId: number, formData: FormData) {
    return this.http.postForFormData(this.VehicleManagementUrl + '/image/' + vehicleId, formData);
  }

  addOrUpdateVehicleDocument(vehicleId: number, formData: FormData) {
    return this.http.postForFormData(this.VehicleManagementUrl + '/document/' + vehicleId, formData);
  }

  updateDocumentData(updateDocumentData: any[], vehicleId: number) {
    return this.http.put(this.VehicleManagementUrl + '/documentdata/' + vehicleId, updateDocumentData);
  }
}
