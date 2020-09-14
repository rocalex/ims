import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { ComponentModel } from './component.model';

@Injectable()
export class ComponentService {
  componentGroupManagementUrl = 'api/componentgroup';
  componentManagementUrl = 'api/component';

  constructor(private http: HttpService) {}

  getComponentGroupsForLoggedInUser() {
    return this.http.get(this.componentGroupManagementUrl);
  }

  getComponentsForLoggedInUser() {
      return this.http.get(this.componentManagementUrl);
  }

  getComponentGroupById(id: number) {
    return this.http.get(this.componentManagementUrl + `/${id}`);
  }

  addComponentGroup(componentGroup: ComponentModel) {
    return this.http.post(this.componentManagementUrl, componentGroup);
  }

  updateComponentGroup(componentGroup: ComponentModel) {
    return this.http.put(this.componentManagementUrl, componentGroup);
  }

  deleteComponentGroup(componentGroupId: number) {
    return this.http.delete(this.componentManagementUrl + '/' + componentGroupId);
  }
}