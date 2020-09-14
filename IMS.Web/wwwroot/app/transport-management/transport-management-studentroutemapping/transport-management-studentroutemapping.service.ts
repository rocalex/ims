import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentRouteMappingService {
  StudentRouteMappingManagementUrl = 'api/studentroutemapping';
  RouteManagementUrl = 'api/routemanagement';
  StudentManagementUrl = 'api/studentmanagement';
  constructor(private http: HttpService) { }

  addOrUpdateStudentRouteMapping(studentRoute: any) {
    return this.http.post(this.StudentRouteMappingManagementUrl, studentRoute);
  }

  getStudentByRouteId(routeId: number) {
    return this.http.get(this.StudentRouteMappingManagementUrl + '/' + routeId);
  }

  getRoutes() {
    return this.http.get(this.RouteManagementUrl);
  }

  getAllStudentByInsituteId() {
    return this.http.get(this.StudentManagementUrl);
  }
}
