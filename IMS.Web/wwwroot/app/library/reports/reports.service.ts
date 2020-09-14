import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { UserModel } from './reports.model';

@Injectable()
export class ReportService {
    BookTypeManagementUrl = 'api/issueBook';

    constructor(private http: HttpService) { }

    getBookList() {
        return this.http.get(this.BookTypeManagementUrl + '/availbook');
    }

    getUserList() {
        return this.http.get(this.BookTypeManagementUrl + '/availuser')
    }

    getBookWiseData(id: number) {
        return this.http.get(this.BookTypeManagementUrl + `/book/${id}`);
    }

    getUserWiseData(user: UserModel) {
        return this.http.get(this.BookTypeManagementUrl + `/user/${user.userType}/${user.id}`);
    }
}