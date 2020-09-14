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
let CityManagementService = class CityManagementService {
    constructor(http) {
        this.http = http;
        this.CityManagementUrl = 'api/institutecountrystatecity/city';
        this.CountryManagementUrl = 'api/institutecountrystatecity/country';
    }
    addInstituteCity(city) {
        return this.http.post(this.CityManagementUrl, city);
    }
    getAllCities() {
        return this.http.get(this.CityManagementUrl);
    }
    getCityDetails(cityId) {
        return this.http.get(this.CityManagementUrl + '/' + cityId);
    }
    updaInstituteCity(city) {
        return this.http.put(this.CityManagementUrl, city);
    }
    getAllCountries() {
        return this.http.get(this.CountryManagementUrl);
    }
};
CityManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], CityManagementService);
exports.CityManagementService = CityManagementService;
//# sourceMappingURL=city-management.service.js.map