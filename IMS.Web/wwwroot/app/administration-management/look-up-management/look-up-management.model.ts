export class AddLookUpManagementAc {
    Code: string;
    Name: string;
    Description: string;
    Status: boolean;
    IsDefault: boolean;
    IsSystemRow: boolean;
    IsDeleted: boolean;
    LookUpId: number;
}

export class UpdateLookUpManagementAc {
    Code: string;
    Name: string;
    Description: string;
    Status: boolean;
    IsDefault: boolean;
    IsSystemRow: boolean;
    IsDeleted: boolean;
    LookUpId: number;
    Id: number;
}

export class LookUpManagementResponse {
    Message: string;
    HasError: boolean;
    ErrorType: LookUpManagementResponseType;
}

export enum LookUpManagementResponseType {
    Code,
    Name,
    Other
}