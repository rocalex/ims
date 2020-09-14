export class AddLeaveTypeManagementAc {
  Code: string;
  Name: string;
  NumberOfAllowedLeave: number;
  LeaveAssignedTypeEnumDescription: string;
  Description: string;
  LeaveAssignedTos: string[];
}

export class UpdateLeaveTypeManagementAc {
  Id: number;
  Code: string;
  Name: string;
  NumberOfAllowedLeave: number;
  LeaveAssignedTypeEnumDescription: string;
  Description: string;
  LeaveAssignedTos: string[];
}

export class LeaveTypeManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: LeaveTypeManagementResponseType;
}

export enum LeaveTypeManagementResponseType {
  Code,
  Name,
  LeaveAssignedTos,
  Id
}