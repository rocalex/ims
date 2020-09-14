export class StageManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: StageManagementResponseType
}

export enum StageManagementResponseType {
  Name,
  Code,
  Id
}

export class AddStageManagementAc {
  Code: string;
  Name: string;
  Address: string;
  SlabId: number;
  Term1: number;
  Term2: number;
  Term3: number;
  Latitude: string;
  Longitude: string;
}

export class UpdateStageManagementAc {
  Id: number;
  Code: string;
  Name: string;
  Address: string;
  SlabId: number;
  Term1: number;
  Term2: number;
  Term3: number;
  Latitude: string;
  Longitude: string;
}