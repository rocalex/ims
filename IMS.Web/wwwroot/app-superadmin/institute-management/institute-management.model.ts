export class AddInstitute {
  InstituteName: string;
  InstituteAdminEmail: string;
  Code: string;
  Address: string;
  Location: string;
  Bcc: string[];
  Cc: string[];
  Users: string[];
  Latitude: string;
  Longitude: string;
}

export class InstituteResponse {
  Message: string;
  HasError: boolean;
  ErrorType: InstituteResponseType;
}

export enum InstituteResponseType {
  InstituteName,
  Code,
  InstituteAdminEmail
}

export class EmailBccAndCc {
  Email: string;
  IsEdit: boolean;
  Id: number;
}

export class UpdateInstitute {
  Id: number;
  InstituteName: string;
  Code: string;
  Address: string;
  Location: string;
  Latitude: string;
  Longitude: string;
}