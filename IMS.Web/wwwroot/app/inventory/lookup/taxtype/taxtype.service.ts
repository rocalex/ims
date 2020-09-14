import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { TaxTypeModel  } from './taxtype.model';

@Injectable()
export class TaxTypeService {
  IssueBookManagementUrl = 'api/taxType';

  constructor(private http: HttpService) {}

  getIssueBooksForLoggedInUser() {
    return this.http.get(this.IssueBookManagementUrl);
  }

  getIssueBookById(id: number) {
    return this.http.get(this.IssueBookManagementUrl + `/${id}`);
  }

  addIssueBook(issueBook: TaxTypeModel) {
    return this.http.post(this.IssueBookManagementUrl, issueBook);
  }

  updateIssueBook(issueBook: TaxTypeModel) {
    return this.http.put(this.IssueBookManagementUrl, issueBook);
  }

  deleteIssueBook(issueBookId: number) {
    return this.http.delete(this.IssueBookManagementUrl + '/' + issueBookId);
  }
}