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
let CurrencyManagementService = class CurrencyManagementService {
    constructor(http) {
        this.http = http;
        this.CurrencyManagementUrl = 'api/institutecurrencymanagement';
    }
    addInstituteCurrency(currency) {
        return this.http.post(this.CurrencyManagementUrl, currency);
    }
    getAllCurrencies() {
        return this.http.get(this.CurrencyManagementUrl);
    }
    getCurrencyDetails(currencyId) {
        return this.http.get(this.CurrencyManagementUrl + '/' + currencyId);
    }
    updaInstituteCurrency(currency) {
        return this.http.put(this.CurrencyManagementUrl, currency);
    }
};
CurrencyManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], CurrencyManagementService);
exports.CurrencyManagementService = CurrencyManagementService;
//# sourceMappingURL=currency-management.service.js.map