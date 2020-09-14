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
// Service
const notification_service_1 = require("../../shared/notification.service");
const snackbar_service_1 = require("../../shared/snackbar-service");
const loader_service_1 = require("../../shared/loader-service");
let NotificationManagementComponent = class NotificationManagementComponent {
    constructor(snackBarService, notificationManagementService, loaderService) {
        this.snackBarService = snackBarService;
        this.notificationManagementService = notificationManagementService;
        this.loaderService = loaderService;
        this.notificationsList = [];
    }
    ngOnInit() {
        this.getAllNotifications();
    }
    getAllNotifications() {
        this.loaderService.toggleLoader(true);
        this.notificationManagementService.getAllNotifications()
            .then(res => {
            this.notificationsList = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    markNotificationAsRead(notificationId) {
        this.loaderService.toggleLoader(true);
        this.notificationManagementService.markNotificationAsRead(notificationId)
            .then(res => {
            location.reload();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    markAllNotificationAsRead() {
        this.loaderService.toggleLoader(true);
        this.notificationManagementService.markAllNotificationAsRead()
            .then(res => {
            location.reload();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
NotificationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'notification-management.html'
    }),
    __metadata("design:paramtypes", [snackbar_service_1.SnackbarService,
        notification_service_1.NotificationManagementService,
        loader_service_1.LoaderService])
], NotificationManagementComponent);
exports.NotificationManagementComponent = NotificationManagementComponent;
//# sourceMappingURL=notification-management.component.js.map