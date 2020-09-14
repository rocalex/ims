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
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const event_management_report_service_1 = require("./event-management-report.service");
const event_management_model_1 = require("../event-management.model");
const material_1 = require("@angular/material");
let EventManagementReportComponent = class EventManagementReportComponent {
    constructor(loaderService, snackbarService, eventManagementReportService) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.eventManagementReportService = eventManagementReportService;
        this.eventManagementReportQueryObj = new event_management_model_1.EventManagementReportQueryAc();
        this.isDateRangeError = false;
    }
    ngOnInit() { }
    clearForm() {
        this.eventManagementReportQueryObj = new event_management_model_1.EventManagementReportQueryAc();
        this.startDate.value = '';
        this.endDate.value = '';
    }
    generateReport() {
        this.isDateRangeError = false;
        if (this.eventManagementReportQueryObj.startDate > this.eventManagementReportQueryObj.endDate) {
            this.isDateRangeError = true;
        }
        else {
            this.loaderService.toggleLoader(true);
            this.eventManagementReportService.generateReport(this.eventManagementReportQueryObj)
                .then((res) => {
                this.snackbarService.showSnackbar('Report generated successfully');
                let contentDisposition = res.headers.get('content-disposition');
                let fileNameMatch = contentDisposition ? /filename="?([^"]*)"?;/g.exec(contentDisposition) : undefined;
                let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
                let blob = new Blob([res._body], { type: res.type });
                const url = window.URL.createObjectURL(blob);
                var link = document.createElement("a");
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.loaderService.toggleLoader(false);
            });
        }
    }
};
__decorate([
    core_1.ViewChild('startDate', { read: material_1.MatInput }),
    __metadata("design:type", material_1.MatInput)
], EventManagementReportComponent.prototype, "startDate", void 0);
__decorate([
    core_1.ViewChild('endDate', { read: material_1.MatInput }),
    __metadata("design:type", material_1.MatInput)
], EventManagementReportComponent.prototype, "endDate", void 0);
EventManagementReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'event-management-report.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        event_management_report_service_1.EventManagementReportService])
], EventManagementReportComponent);
exports.EventManagementReportComponent = EventManagementReportComponent;
//# sourceMappingURL=event-management-report.component.js.map