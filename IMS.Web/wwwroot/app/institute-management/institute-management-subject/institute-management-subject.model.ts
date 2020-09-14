export class AddInstituteSubject {
  constructor() {
    this.IsGroup = false;
  }
  Code: string;
  Name: string;
  Description: number;
  IsGroup: boolean;
}

export class UpdateInstituteSubject {
  constructor() {
    this.IsGroup = false;
  }
  Id: number;
  Code: string;
  Name: string;
  Description: number;
  IsGroup: boolean;
}

export enum InstituteSubjectResponseType {
  Code,
  Name,
  Other
}

export class InstituteSubjectResponse {
  constructor() {
    this.HasError = false
  }
  Message: string;
  HasError: boolean;
  ErrorType: InstituteSubjectResponseType;
}