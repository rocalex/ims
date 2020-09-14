export class TimeTable {
    classId: number;
    sectionId: number;
    academicYearId: number;
    periodCount: number;
    periodDuration: number;
    periodStartTime: string;
    breaksCount: number;
}

export class TimeTableDetails {
    timeTableId: number;
    subjectId: number;
    weekDaysEnum: number;
    weekDaysEnumString: string;
    periodNumber: number;
    isBreakPeriod: boolean;
    timeTableWeekDaySubjectList: TimeTableDetails[];
    timeTableCssClass: string;
}

export class AddTimeTableDetails {
    timeTable: TimeTable;
    timeTableSubjectDetailsList: TimeTableDetails[];
    timeTableBreakDetailsList: TimeTableBreakDetails[];
}

export class TimeTableBreakDetails {
    timeTableId: number;
    breakDuration: number;
    breakAfterPeriod: number;
}