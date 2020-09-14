export class AddStudentLeaveAc {
  StudentId: number;
  FromDate: Date;
  EndDate: Date;
  LeaveTypeId: number;
  Reason: string;
  StatusId: number;
  ApprovedById: number;
  ClassId: number;
}

export class UpdateStudentLeaveAc {
  Id: number;
  StudentId: number;
  FromDate: Date;
  EndDate: Date;
  LeaveTypeId: number;
  Reason: string;
  StatusId: number;
  ApprovedById: number;
  ClassId: number;
}