export class EventManagementLookUpModel {
  Name: string;
  Url: string;
  Icon: string;
}

export function EventManagementLookUps(): EventManagementLookUpModel[] {
  var list: EventManagementLookUpModel[] = [
    { Name: 'Event Info', Url: 'info', Icon: 'zmdi zmdi-receipt' },
    { Name: 'Event Report', Url: 'report', Icon: 'zmdi zmdi-file-text' }
  ];
  return list;
}

export class EventManagementInfoModel {
  id: number;
  name: string;
  eventDate: Date;
  description: string;
  instituteId: number;
  isActive: boolean;
  priority: EventManagementInfoPriorityEnum;
  priorityName: string;
}

export enum EventManagementInfoPriorityEnum {
  High,
  Medium,
  Low
}

export class EventManagementReportQueryAc {
  startDate: Date;
  endDate: Date;
}