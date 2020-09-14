import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { EventManagementService } from '../event-management-info.service';

import { EventManagementInfoModel, EventManagementInfoPriorityEnum } from '../../event-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'event-management-info-edit-detail.html'
})
export class EditDetailEventManagementComponent implements OnInit {

  eventInfoId: number;
  updatedEventInfo: EventManagementInfoModel = new EventManagementInfoModel();
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
    private router: Router,
    private activatedRoute: ActivatedRoute) {

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

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
