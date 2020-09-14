import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { AddressModel, BranchModel  } from './branch.model';

@Injectable()
export class BranchService {
  locationManagementUrl = 'api/location';
  branchManagementUrl = 'api/branch';

  constructor(private http: HttpService) {}

  getCountryList() {
      return this.http.get(this.locationManagementUrl + '/countrylist');
  }

  getStateList(countryId: number) {
      return this.http.get(this.locationManagementUrl + `/statelist/${countryId}`);
  }

  getCityList(stateId: number) {
      return this.http.get(this.locationManagementUrl + `/citylist/${stateId}`);
  }

  saveAddress(address: AddressModel) {
      return this.http.post(this.locationManagementUrl + `/address`, address);
  }

  saveBranch(branch: BranchModel) {
      return this.http.post(this.branchManagementUrl + '', branch);
  }

//   getIssueBooksForLoggedInUser() {
//     return this.http.get(this.IssueBookManagementUrl);
//   }

//   getIssueBookById(id: number) {
//     return this.http.get(this.IssueBookManagementUrl + `/${id}`);
//   }

//   addIssueBook(issueBook: UOMModel) {
//     return this.http.post(this.IssueBookManagementUrl, issueBook);
//   }

//   updateIssueBook(issueBook: UOMModel) {
//     return this.http.put(this.IssueBookManagementUrl, issueBook);
//   }

//   deleteIssueBook(issueBookId: number) {
//     return this.http.delete(this.IssueBookManagementUrl + '/' + issueBookId);
//   }
}