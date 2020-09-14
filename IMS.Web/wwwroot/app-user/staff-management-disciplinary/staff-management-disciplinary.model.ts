export class AddDisciplinaryManagementAc {
  constructor() {
    this.StudentIds = [];
  }
  StaffId: number;
  ClassId: number;
  SectionId: number;
  StudentIds: number[];
  StatusId: number;
  Subject: string;
  Date: Date;
  Description: string;
  Remarks: string;
}

export class UpdateDisciplinaryManagementAc {
  Id: number;
  StatusId: number;
  Subject: string;
  Date: Date;
  Description: string;
  Remarks: string;
  StudentId: number;
}