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
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const http_2 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
let HttpService = class HttpService {
    constructor(http) {
        this.http = http;
    }
    extractData(res) {
        let body = res;
        var option = new http_1.ResponseOptions();
        option.body = body;
        return new http_1.Response(option);
    }
    extractDataForFile(res) {
        let option = new http_1.ResponseOptions();
        option.body = res.body;
        option.headers = res.headers;
        return new http_1.Response(option);
    }
    get(url) {
        return this.http.get(url).pipe(operators_1.map(this.extractData)).toPromise();
    }
    post(url, body) {
        const jsonBody = JSON.stringify(body);
        const headers = new http_2.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.post(url, jsonBody, options).pipe(operators_1.map(this.extractData)).toPromise();
    }
    put(url, body) {
        const jsonBody = JSON.stringify(body);
        const headers = new http_2.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.put(url, jsonBody, options).pipe(operators_1.map(this.extractData)).toPromise();
    }
    postForFormData(url, formData) {
        const headers = new http_2.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.post(url, formData).pipe(operators_1.map(this.extractData)).toPromise();
    }
    postForDownloadFile(url, body) {
        const headers = new http_2.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers, responseType: 'arraybuffer', observe: 'response' };
        return this.http.post(url, body, options).pipe(operators_1.map(this.extractDataForFile)).toPromise();
    }
    delete(url) {
        return this.http.delete(url).pipe(operators_1.map(this.extractData)).toPromise();
    }
};
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_2.HttpClient])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map