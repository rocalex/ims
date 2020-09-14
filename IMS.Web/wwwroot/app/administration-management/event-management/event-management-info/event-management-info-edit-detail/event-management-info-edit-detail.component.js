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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const event_management_info_service_1 = require("../event-management-info.service");
const event_management_model_1 = require("../../event-management.model");
let EditDetailEventManagementComponent = class EditDetailEventManagementComponent {
    constructor(loaderService, snackbarService, eventManagementService, router, activatedRoute) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.eventManagementService = eventManagementService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.updatedEventInfo = new event_management_model_1.EventManagementInfoModel();
        this.eventInfoPriorityEnumDetails = [
            { key: event_management_model_1.EventManagementInfoPriorityEnum.High, value: 'High' },
            { key: event_management_model_1.EventManagementInfoPriorityEnum.Medium, value: 'Medium' },
            { key: event_management_model_1.EventManagementInfoPriorityEnum.Low, value: 'Low' }
        ];
        this.errorMessage = '';
        this.whiteSpaceError = '';
        this.activatedRoute.params.subscribe(param => this.eventInfoId = param.id);
    }
    ngOnInit() {
        this.updatedEventInfo.description = '';
        this.getEventInfoDetail();
    }
    getEventInfoDetail() {
        this.loaderService.toggleLoader(true);
        this.eventManagementService.getEventInfoById(this.eventInfoId)
            .then(res => {
            this.updatedEventInfo = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    updateEventInfo() {
        this.loaderService.toggleLoader(true);
        this.updatedEventInfo.eventDate = this.convertDateToUtc(this.updatedEventInfo.eventDate);
        this.eventManagementService.updateEventInfo(this.updatedEventInfo)
            .then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.errorMessage = response.message;
            }
            else {
                this.snackbarService.showSnackbar(response.message);
                this.router.navigate(['administration', 'event', 'info', 'list']);
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace() {
        this.whiteSpaceError = '';
        if (this.updatedEventInfo.name.trim() === '') {
            this.whiteSpaceError = 'Event Info Name can\'t be null or empty';
        }
    }
    resetError() {
        this.whiteSpaceError = '';
        this.errorMessage = '';
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
EditDetailEventManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'event-management-info-edit-detail.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        event_management_info_service_1.EventManagementService,
        router_1.Router,
        router_1.ActivatedRoute])
], EditDetailEventManagementComponent);
exports.EditDetailEventManagementComponent = EditDetailEventManagementComponent;
//# sourceMappingURL=event-management-info-edit-detail.component.js.map