import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class RoleManagementService {
  RoleManagementUrl = 'api/rolemanagement';
  constructor(private http: HttpService) { }

  addNewRole(role: any) {
    return this.http.post(this.RoleManagementUrl, role);
  }

  getAllRoles() {
    return this.http.get(this.RoleManagementUrl);
  }
}
