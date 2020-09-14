import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { GroupModel } from './componentgroup.model';

@Injectable()
export class ComponentGroupService {
  componentGroupManagementUrl = 'api/componentgroup';

  constructor(private http: HttpService) {}

  getComponentGroupsForLoggedInUser() {
    return this.http.get(this.componentGroupManagementUrl);
  }

  getComponentGroupById(id: number) {
    return this.http.get(this.componentGroupManagementUrl + `/${id}`);
  }

  addComponentGroup(componentGroup: GroupModel) {
    return this.http.post(this.componentGroupManagementUrl, componentGroup);
  }

  updateComponentGroup(componentGroup: GroupModel) {
    return this.http.put(this.componentGroupManagementUrl, componentGroup);
  }

  deleteComponentGroup(componentGroupId: number) {
    return this.http.delete(this.componentGroupManagementUrl + '/' + componentGroupId);
  }
}