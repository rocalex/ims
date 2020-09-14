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
let RelationshipManagementService = class RelationshipManagementService {
    constructor(http) {
        this.http = http;
        this.RelationshipManagementUrl = 'api/relationshipmanagement';
    }
    addInstituteRelationship(relationship) {
        return this.http.post(this.RelationshipManagementUrl, relationship);
    }
    getAllInstituteRelationship() {
        return this.http.get(this.RelationshipManagementUrl);
    }
    getInstituteRelationshipDetail(relationshipId) {
        return this.http.get(this.RelationshipManagementUrl + '/' + relationshipId);
    }
    updateInstituteRelationship(relationship) {
        return this.http.put(this.RelationshipManagementUrl, relationship);
    }
};
RelationshipManagementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], RelationshipManagementService);
exports.RelationshipManagementService = RelationshipManagementService;
//# sourceMappingURL=student-management-relationship.service.js.map