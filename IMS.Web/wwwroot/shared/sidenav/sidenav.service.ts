import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class SidenavService {
  HomeControllerUrl = 'api/home';
  constructor(private http: HttpService) { }

  getLoggedInUserDetail() {
    return this.http.get(this.HomeControllerUrl + '/owndetail');
  }
}
