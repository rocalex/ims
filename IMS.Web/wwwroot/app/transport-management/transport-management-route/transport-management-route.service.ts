import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class RouteService {
  RouteManagementUrl = 'api/routemanagement';
  constructor(private http: HttpService) { }

  addRoute(route: any) {
    return this.http.post(this.RouteManagementUrl, route);
  }

  getRoutes() {
    return this.http.get(this.RouteManagementUrl);
  }

  getRoute(routeId: number) {
    return this.http.get(this.RouteManagementUrl + '/' + routeId);
  }

  updateRoute(route: any) {
    return this.http.put(this.RouteManagementUrl, route);
  }

  getInitialData() {
    return this.http.get(this.RouteManagementUrl + '/initialdata');
  }
}
