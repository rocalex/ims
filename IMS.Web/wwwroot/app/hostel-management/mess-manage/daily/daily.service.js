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
const http_service_1 = require("../../../../core/http.service");
let DailyExpenseService = class DailyExpenseService {
    constructor(http) {
        this.http = http;
        this.dailyExpenseUrl = 'api/dailyExpense';
        this.hostelUrl = 'api/hostel';
        this.messManageUrl = 'api/messManage';
        this.expenseTypeUrl = 'api/expenseType';
    }
    getHostelList() {
        return this.http.get(this.hostelUrl);
    }
    getMessManageList(hostelId) {
        return this.http.get(this.messManageUrl + `/hostel/${hostelId}`);
    }
    getExpenseTypeList() {
        return this.http.get(this.expenseTypeUrl);
    }
    getDailyExpenseList(request) {
        return this.http.post(this.dailyExpenseUrl + `/list`, request);
    }
    saveDailyExpenses(dailyExpenses) {
        return this.http.post(this.dailyExpenseUrl, dailyExpenses);
    }
    uploadProfileProof(formData) {
        return this.http.postForFormData(this.dailyExpenseUrl + '/uploadproof', formData);
    }
};
DailyExpenseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], DailyExpenseService);
exports.DailyExpenseService = DailyExpenseService;
//# sourceMappingURL=daily.service.js.map