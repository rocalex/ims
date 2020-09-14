export class StaffPlanner {
    id: number;
    name: string;
    description: string;
    dateOfPlan: Date;
    isActive: boolean;
    staffId: number;
    staffName: string;
    plannerAttendeeList: PlannerAttendee[];
}

export enum PlannerAttendeeTypeEnum {
    Staff,
    Student,
    SystemUser
}

export class PlannerAttendee {
    plannerId: number;
    plannerName: string;
    attendeeId: number;
    attendeeName: string;
    plannerAttendeeType: PlannerAttendeeTypeEnum;
    plannerTypeEnumString: string;
    isSelected: boolean;
}