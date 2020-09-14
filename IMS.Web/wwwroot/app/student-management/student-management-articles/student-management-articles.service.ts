import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StudentManagementArticlesService {

    StudentManagementArticlesUrl = 'api/studentmanagement/articles';

    constructor(private http: HttpService) { }

    getStudentsArticlesList() {
        return this.http.get(this.StudentManagementArticlesUrl);
    }

    approveArticle(articleId: number) {
        return this.http.get(this.StudentManagementArticlesUrl + '/approve/' + articleId)
    }
}
