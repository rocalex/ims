import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TransportManagementRepairService {
  RepairManagementUrl = 'api/vehiclerepairmanagement';
  constructor(private http: HttpService) { }

  addRepair(repair: any) {
    return this.http.post(this.RepairManagementUrl, repair);
  }

  getRepairs() {
    return this.http.get(this.RepairManagementUrl);
  }

  getRepair(vehicleId: number) {
    return this.http.get(this.RepairManagementUrl + '/' + vehicleId);
  }

  updateRepair(repair: any) {
    return this.http.put(this.RepairManagementUrl, repair);
  }

  getInitialData() {
    return this.http.get(this.RepairManagementUrl + '/initialdata');
  }
}
