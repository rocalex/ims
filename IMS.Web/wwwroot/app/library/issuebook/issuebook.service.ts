import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { IssueBookModel  } from './issuebook.model';

@Injectable()
export class IssueBookService {
  IssueBookManagementUrl = 'api/issueBook';

  constructor(private http: HttpService) {}

  getIssueBooksForLoggedInUser() {
    return this.http.get(this.IssueBookManagementUrl);
  }

  getInitialData() {
      return this.http.get(this.IssueBookManagementUrl + '/initial');
  }

  getIssueBookById(id: number) {
    return this.http.get(this.IssueBookManagementUrl + `/${id}`);
  }

  addIssueBook(issueBook: IssueBookModel) {
    return this.http.post(this.IssueBookManagementUrl, issueBook);
  }

  updateIssueBook(issueBook: IssueBookModel) {
    return this.http.put(this.IssueBookManagementUrl, issueBook);
  }

  deleteIssueBook(issueBookId: number) {
    return this.http.delete(this.IssueBookManagementUrl + '/' + issueBookId);
  }
}