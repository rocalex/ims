import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class TransportManagementMaintenanceService {
  MaintenanceManagementUrl = 'api/vehiclemaintenancemanagement';
  constructor(private http: HttpService) { }

  addMaintenance(maintenance: any) {
    return this.http.post(this.MaintenanceManagementUrl, maintenance);
  }

  getMaintenances() {
    return this.http.get(this.MaintenanceManagementUrl);
  }

  getMaintenance(maintenanceId: number) {
    return this.http.get(this.MaintenanceManagementUrl + '/' + maintenanceId);
  }

  updateMaintenance(maintenance: any) {
    return this.http.put(this.MaintenanceManagementUrl, maintenance);
  }

  getInitialData() {
    return this.http.get(this.MaintenanceManagementUrl + '/initialdata');
  }
}
