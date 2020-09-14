export class BaseModelLookUp {
  Name: string;
  Code: string;
  Status: boolean;
  Description: string;
}

export class LookUpResponse {
  Message: string;
  HasError: boolean;
  ErrorType: LookUpResponseType;
}

export enum LookUpResponseType {
  Name,
  Code
}