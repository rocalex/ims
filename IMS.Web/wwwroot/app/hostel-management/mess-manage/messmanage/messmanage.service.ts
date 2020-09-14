import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { SearchMessRequest, AddMessRequest } from './messmanage.model';

@Injectable()
export class MessManageService {
  messManageUrl = 'api/messManage';
  hostelUrl = 'api/hostel';

  constructor(private http: HttpService) {}

  getMessManage(request: SearchMessRequest) {
    return this.http.post(this.messManageUrl + '/hostel', request);
  }

  getHostelList() {
      return this.http.get(this.hostelUrl);
  }

  addMessManages(request: AddMessRequest) {
      return this.http.post(this.messManageUrl, request);
  }
}