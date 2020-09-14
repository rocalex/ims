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
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.UserUrl = 'api/usermanagement';
    }
    // Method for fetching the list of all user groups
    getAllUsers() {
        return this.http.get(this.UserUrl);
    }
    // Method for fetching the list of all institutes and user groups
    getInstitutesAndUserGroupsList() {
        return this.http.get(this.UserUrl + '/institutes/usergroups/all');
    }
    // Method for fetching a particular user by id
    getUserById(userId) {
        return this.http.get(this.UserUrl + "/" + userId);
    }
    // Method for adding new user group
    addUser(user) {
        return this.http.post(this.UserUrl, user);
    }
    // Method for updating user group
    updateUser(user) {
        return this.http.put(this.UserUrl + '/' + user.id, user);
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map