import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { MappingModel } from './mapping.model';

@Injectable()
export class MappingService {
  mappingUrl = 'api/employeeCompMapping';
  componentUrl = 'api/component';

  constructor(private http: HttpService) {}

  getMappingForLoggedInUser(id: number) {
    return this.http.get(this.mappingUrl + `/staff/${id}`);
  }

  getComponentList() {
    return this.http.get(this.componentUrl);
  }

  getMappingById(id: number) {
    return this.http.get(this.mappingUrl + `/${id}`);
  }

  addMapping(mapping: MappingModel) {
    return this.http.post(this.mappingUrl, mapping);
  }

  updateMapping(mapping: MappingModel) {
    return this.http.put(this.mappingUrl, mapping);
  }

  deleteMapping(mappingId: number) {
    return this.http.delete(this.mappingUrl + '/' + mappingId);
  }
}