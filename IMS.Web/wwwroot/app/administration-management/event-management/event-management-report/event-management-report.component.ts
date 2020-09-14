import { Component, OnInit, ViewChild } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { EventManagementReportService } from './event-management-report.service';

import { EventManagementReportQueryAc } from '../event-management.model';
import { MatInput } from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'event-management-report.html'
})
export class EventManagementReportComponent implements OnInit {

    eventManagementReportQueryObj: EventManagementReportQueryAc = new EventManagementReportQueryAc();
    isDateRangeError: boolean = false;

    @ViewChild('startDate', { read: MatInput })
    startDate: MatInput;
    @ViewChild('endDate', { read: MatInput })
    endDate: MatInput;

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private eventManagementReportService: EventManagementReportService) { }

    ngOnInit() { }

    clearForm() {
        this.eventManagementReportQueryObj = new EventManagementReportQueryAc();
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
                .then((res: any) => {
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
}
