import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { UOMModel  } from './uom.model';

@Injectable()
export class UOMService {
  IssueBookManagementUrl = 'api/uom';

  constructor(private http: HttpService) {}

  getIssueBooksForLoggedInUser() {
    return this.http.get(this.IssueBookManagementUrl);
  }

  getIssueBookById(id: number) {
    return this.http.get(this.IssueBookManagementUrl + `/${id}`);
  }

  addIssueBook(issueBook: UOMModel) {
    return this.http.post(this.IssueBookManagementUrl, issueBook);
  }

  updateIssueBook(issueBook: UOMModel) {
    return this.http.put(this.IssueBookManagementUrl, issueBook);
  }

  deleteIssueBook(issueBookId: number) {
    return this.http.delete(this.IssueBookManagementUrl + '/' + issueBookId);
  }
}