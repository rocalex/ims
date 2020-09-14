"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteManagementResponse {
}
exports.RouteManagementResponse = RouteManagementResponse;
var RouteManagementResponseType;
(function (RouteManagementResponseType) {
    RouteManagementResponseType[RouteManagementResponseType["Name"] = 0] = "Name";
    RouteManagementResponseType[RouteManagementResponseType["Code"] = 1] = "Code";
    RouteManagementResponseType[RouteManagementResponseType["Id"] = 2] = "Id";
})(RouteManagementResponseType = exports.RouteManagementResponseType || (exports.RouteManagementResponseType = {}));
class RouteStageMappingAc {
}
exports.RouteStageMappingAc = RouteStageMappingAc;
class AddRouteManagementAc {
    constructor() {
        this.RouteStageMappings = [];
    }
}
exports.AddRouteManagementAc = AddRouteManagementAc;
class UpdateRouteManagementAc {
    constructor() {
        this.RouteStageMappings = [];
    }
}
exports.UpdateRouteManagementAc = UpdateRouteManagementAc;
//# sourceMappingURL=transport-management-route.model.js.map