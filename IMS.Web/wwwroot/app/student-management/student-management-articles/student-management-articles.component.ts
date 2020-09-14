import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { StudentManagementArticlesService } from './student-management-articles.service';

import { StudentArticles } from './student-management-articles.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-articles.html'
})
export class StudentManagementArticlesComponent implements OnInit {

    articlesList: StudentArticles[] = [];

    constructor(private studentManagementArticlesService: StudentManagementArticlesService,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService) { }

    ngOnInit() {
        this.getStudentsArticlesList();
    }

    getStudentsArticlesList() {
        this.loaderService.toggleLoader(true);
        this.studentManagementArticlesService.getStudentsArticlesList()
            .then(res => {
                this.articlesList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    viewArticle(articleId: number) {
        let url = this.articlesList.filter(x => x.id === articleId)[0].articleFilePath;
        let link = document.createElement("a");
        link.download = 'name';
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    approveArticle(articleId: number) {
        this.loaderService.toggleLoader(true);
        this.studentManagementArticlesService.approveArticle(articleId)
            .then(res => {
                let response = res.json();
                this.snackbarService.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                this.getStudentsArticlesList();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }
}
