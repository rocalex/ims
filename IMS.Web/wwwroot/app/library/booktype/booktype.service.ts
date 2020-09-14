import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BookTypeModel } from './booktype.model';

@Injectable()
export class BookTypeService {
  BookTypeManagementUrl = 'api/booktype';

  constructor(private http: HttpService) {}

  getBookTypesForLoggedInUser() {
    return this.http.get(this.BookTypeManagementUrl);
  }

  getBookTypeById(id: number) {
    return this.http.get(this.BookTypeManagementUrl + `/${id}`);
  }

  addBookType(bookType: BookTypeModel) {
    return this.http.post(this.BookTypeManagementUrl, bookType);
  }

  updateBookType(bookType: BookTypeModel) {
    return this.http.put(this.BookTypeManagementUrl, bookType);
  }

  deleteBookType(bookTypeId: number) {
    return this.http.delete(this.BookTypeManagementUrl + '/' + bookTypeId);
  }
}