export class StaffActivity {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    location: string;
    startTime: string;
    endTime: string;
    meetingAgendaId: number;
    meetingAgendaName: string;
    activityStatusId: number;
    activityStatusName: string;
    activityAttendeeList: ActivityAttendee[];
}

export enum ActivityAttendeeTypeEnum {
    Staff,
    Student,
    SystemUser
}

export class ActivityAttendee {
    activityId: number;
    activityName: string;
    attendeeId: number;
    attendeeName: string;
    activityAttendeeType: ActivityAttendeeTypeEnum;
    attendeeTypeEnumString: string;
    isSelected: boolean;
}