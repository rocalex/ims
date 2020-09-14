import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class ResourceFileManagementService {
  ResourceFileManagementUrl = 'api/home';
  constructor(private http: HttpService) { }

  readResourceFile(fileName: string) {
    return this.http.get(this.ResourceFileManagementUrl + '/resourcefile/' + fileName);
  }

  updateResourceFile(file: any, fileName: string) {
    return this.http.put(this.ResourceFileManagementUrl + '/resourcefile/' + fileName, file);
  }
}
