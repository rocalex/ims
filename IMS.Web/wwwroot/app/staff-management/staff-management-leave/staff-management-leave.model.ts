export class AddStaffLeaveAc {
  StaffId: number;
  FromDate: Date;
  EndDate: Date;
  LeaveTypeId: number;
  Reason: string;
  StatusId: number;
  ApprovedById: string;
}

export class UpdateStaffLeaveAc {
  Id: number;
  StaffId: number;
  FromDate: Date;
  EndDate: Date;
  LeaveTypeId: number;
  Reason: string;
  StatusId: number;
  ApprovedById: string;
}