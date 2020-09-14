export class UserDashboardModel {
    name: string;
    institute: string;
    email: string;
    phoneNumber: string;
    class: string;
    section: string;
    religion: string;
    nationality: string;
    personalImage: string;
    rollNumber: string;
    employeeId: string;
    classStudentCount: number;
    instituteStudentCount: number;
    userDashboardType: UserDashboardTypeEnum;
}

export enum UserDashboardTypeEnum {
    Student,
    Staff
}

export class Attendance {
  FromDate: Date;
  EndDate: Date;
}

export enum AttendanceType {
  None = 'None',
  Present = 'Present',
  Absent = 'Absent',
  Leave = 'Leave',
  HalfLeave = 'Half Leave'
}