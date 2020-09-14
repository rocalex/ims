import { Component, OnInit } from '@angular/core';

import * as EventManagementLookupModel from './event-management.model';

@Component({
    moduleId: module.id,
    templateUrl: 'event-management.html'
})
export class EventManagementComponent implements OnInit {
    eventManagementLookUps: EventManagementLookupModel.EventManagementLookUpModel[] = EventManagementLookupModel.EventManagementLookUps();

    constructor() { }

    ngOnInit() { }
}
