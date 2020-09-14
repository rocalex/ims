import { Component, OnInit } from '@angular/core';

// Service
import { NotificationManagementService } from '../../shared/notification.service';
import { SnackbarService } from '../../shared/snackbar-service';
import { LoaderService } from '../../shared/loader-service';

@Component({
    moduleId: module.id,
    templateUrl: 'notification-management.html'
})
export class NotificationManagementComponent implements OnInit {

    notificationsList: any[] = [];

    constructor(private snackBarService: SnackbarService,
        private notificationManagementService: NotificationManagementService,
        private loaderService: LoaderService) { }

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

    markNotificationAsRead(notificationId: number) {
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
}
