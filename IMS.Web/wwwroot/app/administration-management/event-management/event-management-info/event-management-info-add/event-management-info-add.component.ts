import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { EventManagementService } from '../event-management-info.service';

import { EventManagementInfoModel, EventManagementInfoPriorityEnum } from '../../event-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'event-management-info-add.html'
})
export class AddEventManagementComponent implements OnInit {

  addedEventInfo: EventManagementInfoModel = new EventManagementInfoModel();
  eventInfoPriorityEnumDetails: any[] = [
    { key: EventManagementInfoPriorityEnum.High, value: 'High' },
    { key: EventManagementInfoPriorityEnum.Medium, value: 'Medium' },
    { key: EventManagementInfoPriorityEnum.Low, value: 'Low' }
  ];
  errorMessage: string = '';
  whiteSpaceError: string = '';

  constructor(private loaderService: LoaderService,
    private snackbarService: SnackbarService,
    private eventManagementService: EventManagementService,
    private router: Router) { }

  ngOnInit() {
    this.addedEventInfo.description = '';
  }

  checkWhiteSpace() {
    this.whiteSpaceError = '';
    if (this.addedEventInfo.name.trim() === '') {
      this.whiteSpaceError = 'Event Info Name can\'t be null or empty';
    }
  }

  resetError() {
    this.whiteSpaceError = '';
    this.errorMessage = '';
  }

  addEventInfo() {
    this.loaderService.toggleLoader(true);
    this.addedEventInfo.eventDate = this.convertDateToUtc(this.addedEventInfo.eventDate);
    this.eventManagementService.addNewEventInfo(this.addedEventInfo)
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

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
