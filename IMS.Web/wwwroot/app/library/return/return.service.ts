import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { ReturnBookRequest } from './return.model';
// import { BookTypeModel } from './booktype.model';

@Injectable()
export class ReturnService {
  BookTypeManagementUrl = 'api/booktype';
  bookUrl = 'api/book';
  issueBookUrl = 'api/issueBook';

  constructor(private http: HttpService) {}

  getBooks() {
      return this.http.get(this.bookUrl);
  }
  
  getBookTypesForLoggedInUser() {
    return this.http.get(this.BookTypeManagementUrl);
  }

  getBookTypeById(id: number) {
    return this.http.get(this.BookTypeManagementUrl + `/${id}`);
  }

  getIssueBookInfo(id: number) {
      return this.http.get(this.issueBookUrl + `/book/${id}`);
  }

  returnBook(request: ReturnBookRequest) {
      return this.http.post(this.issueBookUrl + '/return', request);
  }
}