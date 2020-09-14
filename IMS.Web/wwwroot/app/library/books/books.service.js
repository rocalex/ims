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
const http_service_1 = require("../../../core/http.service");
let BookService = class BookService {
    constructor(http) {
        this.http = http;
        this.BookUrl = 'api/book';
        this.BookTypeUrl = 'api/booktype';
    }
    getBookTypes() {
        return this.http.get(this.BookTypeUrl);
    }
    getBookList() {
        return this.http.get(this.BookUrl);
    }
    addBook(request) {
        return this.http.post(this.BookUrl, request);
    }
    updateBook(request) {
        return this.http.put(this.BookUrl, request);
    }
    getBookDetail(id) {
        return this.http.get(this.BookUrl + `/${id}`);
    }
    updateImage(studentId, formData) {
        return this.http.postForFormData(this.BookUrl + '/image/' + studentId, formData);
    }
    delete(id) {
        return this.http.delete(this.BookUrl);
    }
};
BookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=books.service.js.map