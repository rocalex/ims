"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventManagementLookUpModel {
}
exports.EventManagementLookUpModel = EventManagementLookUpModel;
function EventManagementLookUps() {
    var list = [
        { Name: 'Event Info', Url: 'info', Icon: 'zmdi zmdi-receipt' },
        { Name: 'Event Report', Url: 'report', Icon: 'zmdi zmdi-file-text' }
    ];
    return list;
}
exports.EventManagementLookUps = EventManagementLookUps;
class EventManagementInfoModel {
}
exports.EventManagementInfoModel = EventManagementInfoModel;
var EventManagementInfoPriorityEnum;
(function (EventManagementInfoPriorityEnum) {
    EventManagementInfoPriorityEnum[EventManagementInfoPriorityEnum["High"] = 0] = "High";
    EventManagementInfoPriorityEnum[EventManagementInfoPriorityEnum["Medium"] = 1] = "Medium";
    EventManagementInfoPriorityEnum[EventManagementInfoPriorityEnum["Low"] = 2] = "Low";
})(EventManagementInfoPriorityEnum = exports.EventManagementInfoPriorityEnum || (exports.EventManagementInfoPriorityEnum = {}));
class EventManagementReportQueryAc {
}
exports.EventManagementReportQueryAc = EventManagementReportQueryAc;
//# sourceMappingURL=event-management.model.js.map