export class TimesheetsSearchModel {
  payrollType: number;
  academicYear: string;
  fromDate: Date;
  month: number;
  teacher: number;
}

export class TimesheetsResultModel {
  Name: string;
}

export class AcademicYearModel {
  academicYearCode: string;
  instituteId: number;
}

export class TimesheetModel {
  id: number;
  instituteId: number;
  presenceDate: Date;
  presenceType: number;
  staffId: number;
}