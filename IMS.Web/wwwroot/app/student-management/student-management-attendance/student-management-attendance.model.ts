export class GetStudentAttendanceManagementAc {
  StartDate: Date;
  EndDate: Date;
  ClassId: number;
  SectionId: number;
  PeriodOrderId: number;
}

export class AddStudentAttendanceManagementAc {
  constructor() {
    this.AttendanceDates = [];
    this.AttendanceType = [];
  }
  StudentId: number;
  AttendanceDates: Date[];
  AttendanceType: string[];
}

export enum AttendanceType {
  None = 'None',
  Present = 'Present',
  Absent = 'Absent',
  Leave = 'Leave',
  HalfLeave = 'Half Leave'
}

export class AddStudentAttendanceManagementWrapperAc {
  constructor() {
    this.Students = [];
  }
  ClassId: number;
  SectionId: number;
  PeriodOrderId: number;
  Students: AddStudentAttendanceManagementAc[]
}