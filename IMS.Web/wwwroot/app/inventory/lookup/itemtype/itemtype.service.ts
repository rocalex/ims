import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { ItemTypeModel  } from './itemtype.model';

@Injectable()
export class ItemTypeService {
  IssueBookManagementUrl = 'api/itemType';

  constructor(private http: HttpService) {}

  getIssueBooksForLoggedInUser() {
    return this.http.get(this.IssueBookManagementUrl);
  }

  getIssueBookById(id: number) {
    return this.http.get(this.IssueBookManagementUrl + `/${id}`);
  }

  addIssueBook(issueBook: ItemTypeModel) {
    return this.http.post(this.IssueBookManagementUrl, issueBook);
  }

  updateIssueBook(issueBook: ItemTypeModel) {
    return this.http.put(this.IssueBookManagementUrl, issueBook);
  }

  deleteIssueBook(issueBookId: number) {
    return this.http.delete(this.IssueBookManagementUrl + '/' + issueBookId);
  }
}