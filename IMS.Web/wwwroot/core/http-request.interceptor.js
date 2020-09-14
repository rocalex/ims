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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const core_1 = require("@angular/core");
let HttpErrorInterceptor = class HttpErrorInterceptor {
    constructor() {
    }
    intercept(request, next) {
        return next.handle(request)
            .pipe(operators_1.retry(1), operators_1.catchError((error) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
            }
            else {
                // server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            // If status code is 401 un-authorised navigate to login page
            if (error.status === 401) {
                location.href = '/';
            }
            return rxjs_1.throwError(errorMessage);
        }));
    }
};
HttpErrorInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HttpErrorInterceptor);
exports.HttpErrorInterceptor = HttpErrorInterceptor;
//# sourceMappingURL=http-request.interceptor.js.map