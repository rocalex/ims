export class GetStaffAttendanceManagementAc {
  StartDate: Date;
  EndDate: Date;
}

export class AddStaffAttendanceManagementAc {
  constructor() {
    this.AttendanceDates = [];
    this.AttendanceType = [];
  }
  StaffId: number;
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