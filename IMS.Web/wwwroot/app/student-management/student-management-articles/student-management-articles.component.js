"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const student_management_articles_service_1 = require("./student-management-articles.service");
let StudentManagementArticlesComponent = class StudentManagementArticlesComponent {
    constructor(studentManagementArticlesService, loaderService, snackbarService) {
        this.studentManagementArticlesService = studentManagementArticlesService;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.articlesList = [];
    }
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
    viewArticle(articleId) {
        let url = this.articlesList.filter(x => x.id === articleId)[0].articleFilePath;
        let link = document.createElement("a");
        link.download = 'name';
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    approveArticle(articleId) {
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
};
StudentManagementArticlesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-articles.html'
    }),
    __metadata("design:paramtypes", [student_management_articles_service_1.StudentManagementArticlesService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], StudentManagementArticlesComponent);
exports.StudentManagementArticlesComponent = StudentManagementArticlesComponent;
//# sourceMappingURL=student-management-articles.component.js.map