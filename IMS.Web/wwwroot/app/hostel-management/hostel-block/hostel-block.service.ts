import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BlockModel } from './hostel-block.model';

@Injectable()
export class HostelBlockService {
  BookTypeManagementUrl = 'api/hostelBlock';

  constructor(private http: HttpService) {}

  getBookTypesForLoggedInUser() {
    return this.http.get(this.BookTypeManagementUrl);
  }

  getBookTypeById(id: number) {
    return this.http.get(this.BookTypeManagementUrl + `/${id}`);
  }

  addBookType(bookType: BlockModel) {
    return this.http.post(this.BookTypeManagementUrl, bookType);
  }

  updateBookType(bookType: BlockModel) {
    return this.http.put(this.BookTypeManagementUrl, bookType);
  }

  deleteBookType(bookTypeId: number) {
    return this.http.delete(this.BookTypeManagementUrl + '/' + bookTypeId);
  }
}